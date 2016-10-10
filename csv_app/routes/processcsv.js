var express = require('express');
var router = express.Router();
var fs = require('fs');
var util =  require('util');
var async = require("async");
var csvParser = require('csv-parse');
var mail = require("nodemailer").mail;
var db = require('../bin/util/db/db');

router.get('/', function(req, res, next) {
    var start = new Date();
    var asyncTasks = [];
    var lines;

    asyncTasks.push(function (callback) {
        if (typeof req.query.filepath == 'undefined') {
            callback('ENOENT',null);
        }
        fs.readFile(req.query.filepath, {
            encoding: 'utf-8'
        }, function(err, csvData) {
            if (err) {
                if (err.code === 'ENOENT') {
                    callback('ENOENT',null);
                }
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
                                }
                            }
                            db.bulkImport(lines,10000, function () {
                                callback();
                            });

                }

            });
        });
    });
    async.parallel(asyncTasks, function(err, result){
        //var time = `Execution time: ${new Date() - start}ms`;
        var content = util.format("Importer execution time: %dms and date the form was submited: %s",new Date() - start,req.query.date);
        // All tasks are done now remove the CSV file
       if (err === 'ENOENT') {
           console.log('olen erroris.');
           //req.flash('info', 'No such file');
            //res.redirect('/search', {messages: req.flash('info')});
            //res.render('index');
            res.redirect('/');
        } else {
            fs.unlink(req.query.filepath, function (err, res) {
            });
            sendmail(req.query.email, content);

           res.redirect('/search');
        }

    });


});

function sendmail(to, content) {
    mail({
        from: "CSV Stuff  <pieman@place.com>", // sender address
        to: to, // list of receivers
        subject: "Hello ✔", // Subject line
        text: content, // plaintext body
        html: "<b>"+content+"</b>" // html body
    });
}
module.exports = router;
