var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'pipe',
    password : 'pipe',
    database : 'pipenode'
});
connection.connect(function(err) {
    if (err !== null) {
        console.log("[MYSQL] Error connecting to mysql:" + err+'\n');
    }
});

var con = function (sql, values) {


   connection.query(sql, values, function(err, rows, fields) {
        //connection.end(); // close the connection
        if (err) {
            throw err;
        }
        // Execute the callback
        //next.apply(this, arguments);
/*        console.log('-----rows--------');
        console.log(rows);
        console.log('----------rows styingified------------');
        console.log(JSON.stringify(rows));
        console.log('-------fields-----------');
        console.log(fields);
        console.log('----------------');*/
        con.koer = rows;
    });
};

module.exports = connection;