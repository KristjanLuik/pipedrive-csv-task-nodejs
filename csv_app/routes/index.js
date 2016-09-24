var express = require('express');
var router = express.Router();
var ejs = require('ejs');

function getUploadForm() {
  return '<form action="/upload" enctype="multipart/form-data" method="post">'+
 // return '<form action="/upload"  method="post">'+
         '<input type="date" name="date"><br>'+
         '<input type="email" name="email"><br>'+
         '<input type="file" name="upload" ><br>'+
         '<input type="submit" value="Upload">'+
         '</form>'

}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', form: getUploadForm()});
});

module.exports = router;
