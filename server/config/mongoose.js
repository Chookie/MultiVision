(function(){

    var mongoose = require('mongoose');

    module.exports = function(config){

        mongoose.connect(config.db);
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error...'));
        db.once('open', function callback() {
            console.log('multivision db opened on ' + (config.db.indexOf("localhost") !== -1 ? 'localhost' : 'remote host'));
        });

        var userSchema = mongoose.Schema({
            firstName: String,
            lastName: String,
            userName: String
        });

        var User = mongoose.model('User', userSchema);

        User.find({}).exec(function (err, collection){
           if(collection.length === 0){
               User.create({firstName: 'Alison', lastName: 'Johnston', userName: 'alison'});
               User.create({firstName: 'Jimmy', lastName: 'Hendrix', userName: 'jim'});
           }
        });

        /* Moved in chapter 4.3
         // Create a schema
         var messageSchema = mongoose.Schema({message:  String });
         // Create model using this schema
         var Message = mongoose.model('Message', messageSchema);
         var mongoMessage;
         // Find first message in database
         Message.findOne().exec( function( err, result) {
         mongoMessage = result.message;
         });*/
    }

}());