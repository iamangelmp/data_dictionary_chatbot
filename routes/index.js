var express = require("express");
var router = express.Router();
const { checkMessage } = require("../controllers/dictionary.controller.js");
const { createDictionary } = require("../controllers/xlsx.controller.js");
require("dotenv").config();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/ReadMessage", checkMessage);

router.post("/createDictionary", createDictionary);

module.exports = router;
