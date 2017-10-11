/*
*   connection.js
*/
var conn = {
    mongoConnection : function(data){
        var mongoose = require('mongoose');
        var connectionString = 'mongodb://' + data.username + ':' + data.password + '@ds113455.mlab.com:13455/'+data.database;
        // var connectionString = 'mongodb://127.0.0.1/my_database';

        let p1 = new Promise((resolve, reject) => {
            mongoose.Promise = global.Promise;
            mongoose.connect(connectionString, {
                useMongoClient:true
            })
            .on('connected', resolve(" > MongoDB connected successfully!"))
            .on('error', reject(" > MongoDB connection error : "+ err))
        });
         
        p1.then((val) => {
            console.log(val)
        })
        .catch((reason) => {
            console.log(reason);
        });
    },

    mysqlConnection: function(data){
        var mysql = require('mysql');
        let p1 = new Promise((resolve, reject) => {
            var con = mysql.createConnection({
                host: data.host,
                user: data.username,
                password: data.password
            });
              
            con.connect(function(err) {
                if (err)  reject(" > MySQL connection error : ", err);
                resolve(" > MySQL database is connected successfully!")
            });
            conn.on('error', function(err) {
                reject(" > MySQL connection error : ", err);
                // Connection to the MySQL server is usually
                // lost due to either server restart, or a
                // connnection idle timeout (the wait_timeout
                // server variable configures this)             
            });
        });
        p1.then((val) => {
            console.log(val)
        })
        .catch((reason) => {
            console.log(reason);
        });
    }
}

module.exports = conn;