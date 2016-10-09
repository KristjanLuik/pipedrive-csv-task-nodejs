var dbconnection = require('../connect');
var async = require("async");
var fs = require('fs');

var db = {

    hello: function () {
        return 'hello bird';
    },

    runquery: function (sql) {
        try {
            dbconnection.query(sql, function (err, rows, fields) {
                //connection.end(); // close the connection
                if (err) {
                    //throw err;
                }
            });
        } catch (e) {
            console.error('err thrown: ' + err.stack);
        }

    },
    
    asyrequest: function (sql, callback) {
        dbconnection.query(sql, function(err, rows, fields) {
            //connection.end(); // close the connection
            if (err) {
                throw err;
            }
            //result = rows;
            callback(rows);
        });
        //return result;
    },

    bulkImport: function (data_array, amount, cb) {
        var sql = "INSERT INTO `pipenode`.`csvs` (`Id`, `name`, `age`, `address`, `team`) VALUES ";
        var temp = '';
        var times = Math.floor(data_array.length/amount);
        var over = false;
        if (data_array.length < amount) {
            //All fit in one iteration
            times++;
            over = true;
        }
        for (var i = 0; i < times; i++) {
            temp = '';
            temp += sql;
            if (!over) {

                for (var j = i * amount; j < (i * amount) + amount; j++) {
                    temp += '(';
                    temp += data_array[j];
                    if (j == ((i * amount) + amount - 1)) {
                        //Don't add coma to last element.
                        temp += ')';
                    } else {
                        temp += ')';
                        temp += ',';
                    }
                }

            }
            //If uneven amount of data
            if ((i == (times - 1)) && (data_array.length % amount != 0)) {
                var temp2 = '';
                temp2 += sql;
                var elements_left = data_array.length % amount;
                for (var k = (data_array.length -  elements_left); k < (data_array.length-1); k++) {
                    temp2 += '(';
                    temp2 += data_array[k];
                    if (k == (data_array.length - 2)) {
                        //Don't add coma to last element.
                        temp2 += ')';
                    } else {
                        temp2 += ')';
                        temp2 += ',';
                    }

                }

                //console.log(temp2);
                db.runquery(temp2);
            }
            if (!over) {
                //Execute db
                //console.log(temp);
                db.runquery(temp);

            }

        }

        cb();
    }

};

module.exports = db;