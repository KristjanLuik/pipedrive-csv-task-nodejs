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
    
    asyrequest: function () {

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
            //Execute db
            console.log(temp);

        }

    }

    

};

module.exports = db;