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

    mysqlConnection: function(){

    }
}

module.exports = conn;