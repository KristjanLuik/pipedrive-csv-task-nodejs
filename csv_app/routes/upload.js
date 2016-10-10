var express = require('express');
var router = express.Router();
var ejs = require('ejs');
var formidable = require('formidable');
var validator = require('validator');
var fs = require('fs');

router.post('/', function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.uploadDir = "public/uploads";

    form.parse(req, function(err, fields, files) {
        var error = {email:false, date: false, file: false};
        if (validator.isEmpty(fields.email) || !validator.isEmail(fields.email)) {
            //Validate email
            error.email = true;
        }else if (validator.isEmpty(fields.date) || !validator.isDate(fields.date)) {
            error.date = true;
        //}else if (!validator.isEmpty(files.upload.File.name) || files.upload.File.name.match(/\.(csv)$/i)) {
        }else if (files.upload.name == '' /*|| !files.upload.File.name.match(/\.(csv)$/i)*/) {
            error.file = true;
        }

        if(error.email || error.date || error.file){
            //There was an error
            res.redirect('/');
            fs.unlink(files.upload.path, function (err, res) {
            });
        }else {
            //There was no error
            res.redirect('/processcsv' + "?filepath=" + files.upload.path +"&&email="+fields.email +"&&date="+fields.date);
        }
    });
});

module.exports = router;
