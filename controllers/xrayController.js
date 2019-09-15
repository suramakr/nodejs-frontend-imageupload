"use strict";

const fs = require("fs");
const Busboy = require("busboy");
const randomstring = require("randomstring");

exports.profilePictUpload = (req, res) => {
  const tokenValidationError = checkAuthToken(req.get("Authorization"));
  if (tokenValidationError)
    return res.status(400).json({
      status: false,
      message: tokenValidationError
    });

  var busboy = new Busboy({ headers: req.headers });
  busboy.on("file", function(fieldname, file, filename, encoding, mimetype) {
    sendUploadToGCS(file, filename, mimetype)
      .then(url => {
        // send url to user
        res.json({ url });

        // delete old image and update user profile
        const { patientId, docId } = req.params;
        const ref = db.doc(`doctors/${docId}/mypatients/${patientId}`);
        ref.get().then(patient => {
          // try to remove the file and ignore errors if any
          if (patient.data().profilePicUrl)
            removeFileFromGCS(patient.data().profilePicUrl).catch(e =>
              console.error(e)
            );
          //ref.update({ profilePicUrl: url })
          //set with merge will update fields in the document or create it if it doesn't exists
          ref.set({ profilePicUrl: url }, { merge: true });
        });
      })
      .catch(e => {
        console.error("upload failed: ", e);
        res.status(500, { message: "upload failed" });
      });
  });

  req.pipe(busboy);
};
