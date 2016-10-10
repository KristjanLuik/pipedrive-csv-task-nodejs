var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : process.env.DB_HOSTNAME ||'localhost',
    user     : process.env.DB_1_ENV_MYSQL_USER || 'pipe',
    password : process.env.PIPEDRIVECSVTASKNODEJS_DB_1_ENV_MYSQL_PASSWORD ||'pipe',
    database : process.env.DB_1_ENV_MYSQL_DATABASE ||'pipenode'
});
connection.connect(function(err) {
    if (err !== null) {
        console.log("[MYSQL] Error connecting to mysql:" + err+'\n');
    }
});


module.exports = connection;