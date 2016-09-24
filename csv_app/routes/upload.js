var express = require('express');
var router = express.Router();
var ejs = require('ejs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var formidable = require('formidable');


router.post('/',urlencodedParser, function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        console.log(fields);
    });
    //console.log(req.params);
    //console.log(req.body);
    res.send('Got it: ');
});

module.exports = router;
