// conf.include-all.js
module.exports = function(connector){
    var path = require('path');
    if(connector == "MongoDB"){
        var mongoose = require('mongoose');
        var models = require('include-all')({
            dirname     :  path.join(__dirname, '../Models'),
            filter      :  /(.+)\.js$/,
            excludeDirs :  /^\.(git|svn)$/,
            optional    :  true
        });
        // console.log("-------------------------------------- LOADING models.")
        // console.log(models)
        var Model = {};
        for(var i in models){
            var x = new mongoose.Schema(models[i])
            Model[i] = mongoose.model(i, x)
        }
        return Model;
    }
}