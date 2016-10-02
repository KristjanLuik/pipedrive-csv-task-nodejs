var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('API');
});

router.get('/:field/:string', function(req, res, next) {

 // res.send('API field:' + req.params.field + " otsingu string: " + req.params.string);
  res.status(200).json([
    {
      id: "1",
      name: "rida1",
      age: "34",
      address: "koht",
      team: "roheline"
    },
    {
      id: "2",
      name: "rida2",
      age: "45",
      address: "asd",
      team: "punane"
    },
    {
      id: "3",
      name: "asd",
      age: "234",
      address: "place",
      team: "kollane"
    }
  ]);
  //res.send('API');
});

module.exports = router;
