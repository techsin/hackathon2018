const database = require('../../database');

require("dotenv").config();

function faceDetect(req, res, next) {
  (function () {
    return new Promise(function (resolve, reject) {
      var res = {};
      var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
      var visualRecognition = new VisualRecognitionV3({
        version: '2018-03-19',
        api_key: process.env.api_key
      });
      visualRecognition.detectFaces({
        'url': 'https://i.imgur.com/EkuU0uJ.jpg'
      }, function (err, res) {
        if (err)
          reject(err);
        else
          resolve(res);
      });
    });
  }()).then((results) => {
    res.locals.apiData = results.images[0].faces[0].face_location
    next();
  })
    .catch((error) => {
      console.log(error);
      next();
    });
}

function checkInDatabase(obj) {
  console.log('database => ', database.database);
  if (JSON.stringify(database.database) === JSON.stringify(obj)) {
    console.log('');
    console.log('Data => ', obj);
    return true;
  } else {
    return false;
  }
}

module.exports = {
  faceDetect,
};



