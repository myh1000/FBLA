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
	/* GET New User page. */
	router.get('/login', function(req, res) {
		res.render('login', { title: 'Gunn FBLA - Login', message: req.flash('message')});
	});
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash : true
	}));
	/* GET New User page. */
	router.get('/registration', function(req, res) {
		res.render('registration', { title: 'Gunn FBLA - User Registration', message: req.flash('message')});
	});
    /* Handle Registration POST */
    router.post('/registration', passport.authenticate('signup', {
		successRedirect: '/profile',
		failureRedirect: '/registration',
		failureFlash : true
	}));
    return router;
}
// module.exports = router;
