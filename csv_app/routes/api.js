var express = require('express');
var router = express.Router();
//var db = require('../bin/util/connect');
var db = require('../bin/util/db/db');
var async = require("async");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('API');
});

router.get('/:field/:string', function(req, res, next) {
  db.asyrequest('SELECT * FROM `csvs`', function (result) {
    res.status(200).json(JSON.stringify(result));
  });
});

module.exports = router;
