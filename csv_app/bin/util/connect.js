var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'pipe',
    password : 'pipe',
    database : 'pipenode'
});
module.exports.db = {

    msg: function () {
        return('this is pieeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    },

    con: function () {
        return connection;
    }

};