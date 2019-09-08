var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", {
    title: "Welcome to MedAI - Fracture Prediction Made Simple"
  });
});

module.exports = router;
