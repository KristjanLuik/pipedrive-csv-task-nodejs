var express = require('express');
var router = express.Router();
var fs = require('fs');
var csv = require('csv');
var async = require("async");
var csvParser = require('csv-parse');
//var db = require('../bin/util/connect');
var db = require('../bin/util/db/db');


router.get('/', function(req, res, next) {
    var asyncTasks = [];
    var lines;
    asyncTasks.push(function (callback) {
        fs.readFile(req.query.filepath, {
            encoding: 'utf-8'
        }, function(err, csvData) {
            if (err) {
                console.log(err);
            }

            csvParser(csvData, {
                delimiter: ','
            }, function(err, data) {
                if (err) {
                    console.log(err);
                } else {
                        lines = data;
                            for (var i = 0, len = lines.length; i < len; i++) {
                                
                                if (typeof lines[i] == 'undefined') {
                                    //Remove empty rows.
                                    lines.splice(i,1);
                                }else if (lines[i].length != 6) {
                                    lines.splice(i,1);
                                }else if (!lines[i][0] || !lines[i][1] || !lines[i][2] || !lines[i][3] || !lines[i][4]) {
                                    lines.splice(i,1);
                                }else {
                                    lines[i][3] = lines[i][3] + ' '+ lines[i][4];
                                    lines[i].splice(4,1);
                                    lines[i] = "'" + lines[i].join("','") + "'";
                                    if ((lines[i].match(/,/g) || []).length != 4) {
                                        console.log('Ei vordu neli> ' + i);

                                    }
                                }


                                //db('INSERT INTO `pipenode`.`csvs` (`Id`, `name`, `age`, `address`, `team`) VALUES ('+ lines[i] + ')');
                                //db.runquery('INSERT INTO `pipenode`.`csvs` (`Id`, `name`, `age`, `address`, `team`) VALUES ('+ lines[i] + ')');
                                //console.log(lines[i]);
                            }
                            //console.log(lines);
                            db.bulkImport(lines,10000);
                            callback();
                }

            });
        });
    });
    async.parallel(asyncTasks, function(){
        // All tasks are done now
        //res.send('Imported: ' + lines.length);
       // res.redirect('/search');
    });


});

module.exports = router;
