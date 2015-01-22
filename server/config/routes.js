(function(){

    var passport = require('passport');

    module.exports = function(app) {

        /*  5.2 Once add subdirectories get error due to subfolders causing cyclic routing
         // Requests coming from angular, send back the fragment (partial) it wants
         app.get('/partials/:partialPath', function (req, res) {
         res.render('partials/' + req.params.partialPath) ;
         });*/
         // Requests coming from angular, send back the fragment (partial) it wants
         // index[0] returns the star, zeroth element
         // Also moving folder.  Paths is relative to views directory as per view engine above
        app.get('/partials/*', function (req, res) {
            res.render('../../public/app/' + req.params[0]) ;
        });

        app.post('/login', function (req, res, next) {
            var auth = passport.authenticate('local', function (err, user, info) {
                // If no password entered then authenticate does not get called on serverside of passport
                if(err) {
                    console.error('login post err' + err);
                   return next(err);
                }
                if(!user){
                    console.error('login post user falsey');
                    res.send({success:false})
                } else {
                    req.logIn(user, function (err) {
                        if (err) {
                            console.error('login post login' + err);
                            return next(err);
                        }
                        res.send({success: true, user: user});
                    });
                }
            });
            auth(req, res, next);
        });

        // * means how to handle all requests and send to index page
        // Server will always return index.html client page which will then route on client side using angular routing etc.
        // Making client do all the routing rather then this server
        // Can get into trouble if you forget leading slash in angular
        // Other solution is to have server know about all client side routes
        // and have default * send back 404 error
        app.get('*', function (req, res) {
            res.render('index');
        });
        /* Moved in chapter 4.3
         /app.get('*', function (req, res) {
         res.render('index', { mongoMessage: mongoMessage });
         });*/
    };

}());