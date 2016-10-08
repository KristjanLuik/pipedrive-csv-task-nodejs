var db = require('./db/db');
var database = {DB:'',Table: ''};
db.runquery('CREATE DATABASE IF NOT EXISTS Pipenode',function (err, rows) {
    if(!err){
        database.DB = 'ok';
    }else {
        console.log(err);
    }
});

db.runquery('TRUNCATE TABLE `csvs`',function (err, rows) {
    if(!err){
        database.Table = 'ok';
    }else {
        database.Table = 'Not ok';
    }
});

db.runquery('CREATE TABLE IF NOT EXISTS `csvs`(' +
    'Id INT NOT NULL,' +
    'name VARCHAR(100) NOT NULL,' +
    'age INT NOT NULL,' +
    'address VARCHAR(100) NOT NULL,' +
    'team VARCHAR(40) NOT NULL,' +
    'PRIMARY KEY ( Id )' +
    ')',function (err, rows) {
    if(!err){
        database.Table = 'ok';
    }else{
        database.Table = 'Not ok';
    }
});

module.exports = database;