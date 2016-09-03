var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

    /* GET home page. */
    router.get('/', function(req, res, next) {
      res.render('home', { title: 'Gunn FBLA - Home' });
    });
    /* GET userlist test page. */
    router.get('/userlist', function(req, res) {
        var db = req.db;
        var collection = db.get('usercollection');
        collection.find({},{},function(e,docs){
            res.render('userlist', {
                "userlist" : docs
            });
        });
    });
    /* GET New User page. */
    router.get('/registration', function(req, res) {
        res.render('registration', { title: 'Gunn FBLA - User Registration' });
    });
    /* GET About page. */
    router.get('/about', function(req, res, next) {
      res.render('about', { title: 'Gunn FBLA - About' });
    });
    /* GET index page. */
    router.get('/index', function(req, res, next) {
      res.render('home', { title: 'Gunn FBLA - Home' });
    });
    /* GET events page. */
    router.get('/events', function(req, res, next) {
      res.render('events', { title: 'Gunn FBLA - Events' });
    });
    /* POST to Add User Service */
    router.post('/adduser', function(req, res) {

        // Set our internal DB variable
        // var db = req.db;
        // var validator = req.validator;
        // // Get our form values. These rely on the "name" attributes
        // var userName = req.body.uName;
        // var userEmail = req.body.email;
        // if (validator.isEmail(userEmail)) {
        //     // Set our collection
        //     var collection = db.get('usercollection');
        //
        //     // Submit to the DB
        //     collection.insert({
        //         "username" : userName,
        //         "email" : userEmail
        //     }, function (err, doc) {
        //         if (err) {
        //             // If it failed, return error
        //             res.send("There was a problem adding the information to the database.");
        //         }
        //         else {
        //             // And forward to success page
        //             res.redirect("profile");
        //         }
        //     });
        // }
        // else {
        //     console.log("Bad Email, not adding to database");
        //     res.redirect('back')
        // }
    });
    return router;
}
// module.exports = router;
