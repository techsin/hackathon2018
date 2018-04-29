var express = require('express');
var router = express.Router();
const visualRecognitionHelper = require('../services/ibm/visualRecognitionHelper');


router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/camera', function (req, res, next) {
  res.render('camera');
});

router.get('/detail', visualRecognitionHelper.faceDetect, function (req, res, next) {
  res.render('detail');
});


module.exports = router;
