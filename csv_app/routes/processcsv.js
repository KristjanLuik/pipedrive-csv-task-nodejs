var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log(req.query.filepath);
    fs.readFile(req.query.filepath,function (err, data) {
        res.send('respond with processcsv size: ' + data);
    });

});

module.exports = router;
