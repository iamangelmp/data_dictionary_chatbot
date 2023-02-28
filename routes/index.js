var express = require('express');
var router = express.Router();
const checkMessage = require('../controllers/dictionary.controller.js')
require('dotenv').config()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/message',checkMessage )

module.exports = router;
