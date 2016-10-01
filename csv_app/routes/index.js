var express = require('express');
var router = express.Router();
var ejs = require('ejs');
var db = require('../bin/util/connect');

function getUploadForm() {
  return '<form action="/upload" enctype="multipart/form-data" method="post">'+
         '<input type="date" name="date"><br>'+
         '<input type="email" name="email"><br>'+
         '<input type="file" name="upload" ><br>'+
         '<input type="submit" value="Upload">'+
         '</form>'

}

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('connected as id ' + db.threadId);

  res.render('index', { title: 'Express', form: getUploadForm()});
});

module.exports = router;
