var express = require("express");
var router = express.Router();

var xray_controller = require("../controllers/xrayController.js");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", {
    title: "Welcome to medTatva"
  });
});

// serve file upload
// router.post('/file-upload', xray_controller.fileUpload);

module.exports = router;
