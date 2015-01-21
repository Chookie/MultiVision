var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
// Upper case because is constructor
var LocalStrategy = require('passport-local').Strategy;

var appConfig = require("./server/config/config");
var expressConfig = require("./server/config/express");
var mongoose = require("./server/config/mongoose");
var routes = require("./server/config/routes");

// Node has variable for environment, if it has been set else default
var env = process.env.DEBUG_ENV = process.env.DEBUG_ENV || 'development';

// Create express app
var app = express();

var config = appConfig[env];

expressConfig(app, config);

mongoose(config);

var User= mongoose.model('User');
passport.use(new LocalStrategy(
    function(username, password, done){
        User.findOne({ username: username}).exec( function (err, user) {
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }
));

passport.serializeUser( function (user, done) {
    if(user) {
        done(null, user._id);
    }
});

passport.deserializeUser( function (id, done) {
    User.findOne({ _id: id }).exec( function (err, done){
        if(user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
});

routes(app);
/*require("./server/config/mongoose")(config);
require("./server/config/routes")(app);*/


app.listen(config.port);
console.log("Listening on port " + config.port + " in " + env + " mode");