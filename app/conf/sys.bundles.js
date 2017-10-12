// conf.include-all.js
var path = require('path');

var bundles = {
    models: function(connector){
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
    },
    controllers: function(){
        var controllers = require('include-all')({
            dirname     :  path.join(__dirname, '../Controllers'),
            filter      :  /(.+Controller)\.js$/,
            excludeDirs :  /^\.(git|svn)$/
        });
        // var Controllers = {};
        // for(var i in controllers){
        //     var x = new mongoose.Schema(controllers[i])
        //     // Model[i] = mongoose.model(i, x)
        // }
        // return Model;
        console.log(controllers);
        return controllers;
    }
}
module.exports = bundles;