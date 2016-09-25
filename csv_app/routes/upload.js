var express = require('express');
var router = express.Router();
var ejs = require('ejs');
var formidable = require('formidable');


router.post('/', function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.uploadDir = "public/uploads";
    form.parse(req, function(err, fields, files) {
        //res.send(JSON.stringify(files));
        res.redirect('/processcsv' + "?filepath=" + files.upload.path)
    });
    //res.redirect('/processcsv')
});

module.exports = router;
