(function(){

    var mongoose = require('mongoose');
    var auth = require('./auth');

    module.exports = function(app, config){

        mongoose.connect(config.db);
        var db = mongoose.connection;
        //db.on('error', console.error.bind(console, 'connection error...'));
        db.on('error', function (err){
            console.error("connection error... %s", err);
            app.close();
            process.exit(0);
        });
        db.once('open', function callback() {
            console.log('multivision db opened on ' + (config.db.indexOf("localhost") !== -1 ? 'localhost' : 'remote host'));
        });

        var userSchema = mongoose.Schema({
            firstname: String,
            lastname: String,
            username: String,
            // We are sending he salt and password back to the client.  Should remove these from data sent to client.
            salt: String,
            hashed_pwd: String,
            roles: [String]
        });

        var User = mongoose.model('User', userSchema);

        User.find({}).exec(function (err, collection){
            if(collection.length === 0){
                console.log('populating users collection');
                var salt, hash;
                salt = auth.createSalt();
                // Here just using username for password for simplicity
                hash = auth.hashPwd(salt, 'alison');
                User.create({
                                firstname: 'Alison', lastname: 'Johnston', username: 'alison', salt: salt, hashed_pwd: hash,
                                roles: ['admin']
                            });
                salt = auth.createSalt();
                hash = auth.hashPwd(salt, 'jim')
                User.create({firstname: 'Jimmy', lastname: 'Hendrix', username: 'jim', salt: salt, hashed_pwd: hash,});
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