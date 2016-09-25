var express = require('express');
var router = express.Router();
var ejs = require('ejs');
//var db = require('../bin/util/connect');
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'pipe',
    password : 'pipe',
    database : 'pipenode'
});
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


    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }

        console.log('connected as id ' + connection.threadId);
    });
  res.render('index', { title: 'Express', form: getUploadForm()});
});

module.exports = router;
