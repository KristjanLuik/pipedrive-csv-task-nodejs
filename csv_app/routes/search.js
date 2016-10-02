var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
/*  res.status(200).json(            {
    id: "2",
    name: "rida2",
    age: "45",
    address: "asd",
    team: "punane"
  });*/
  res.render('search');
});

module.exports = router;
