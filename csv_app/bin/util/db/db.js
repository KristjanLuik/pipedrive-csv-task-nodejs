var dbconnection = require('../connect');
var async = require("async");

var db = {

    hello: function () {
        return 'hello bird';
    },

    runquery: function (sql) {
        dbconnection.query(sql, function(err, rows, fields) {
                //connection.end(); // close the connection
                if (err) {
                    throw err;
                }
        });

    },
    
    asyrequest: function (sql, callback) {
        /*var asyncTasks = [];
        asyncTasks.push(function (callback) {
            dbconnection.query(sql, function(err, rows, fields) {
                //connection.end(); // close the connection
                if (err) {
                    throw err;
                }
                callback(null,rows)
            });
        });
        async.parallel(asyncTasks, function(err, result){
            console.log('results');
            return result[0];
        });
        */
        var result;
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

    /*
    *
    *
    * */
    bulkImport: function (data_array, amount) {
        var sql = "INSERT INTO `pipenode`.`csvs` (`Id`, `name`, `age`, `address`, `team`) VALUES ";
        var temp = '';
        var times = Math.floor(data_array.length/amount);
        console.log('times: ' + times);
        if (data_array.length < amount) {
            //All fit in one iteration
            times++;
        }
        if (data_array.length % amount != 0) {
            // We are dealing with over or under even
        }
        for (var i = 0; i < times; i++) {
            temp = '';
            temp += sql;
            for (var j = i*amount; j < (i*amount)+ amount; j++) {
                temp += '(';
                temp += data_array[j];
                if (j == ((i*amount)+ amount - 1)) {
                //Don't add coma to last element.
                    temp +=')';
                }else {
                    temp +=')';
                    temp +=',';
                }
            }
            //If uneven amount of data
            if (data_array.length % amount != 0) {

            }
            //Execute db
            console.log(temp);

        }

    }

    

};

module.exports = db;