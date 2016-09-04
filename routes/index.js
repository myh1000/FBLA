
module.exports = function(app, passport){

	var mongoose = require('mongoose')
	app.use(function (req, res, next) {
		res.locals.login = req.isAuthenticated();
		// res.locals.user = req.user;
		next();
	});

    /* GET home page. */
    app.get('/', function(req, res, next) {
      res.render('home', { title: 'Gunn FBLA - Home' });
    });
    /* GET userlist test page. */
    app.get('/userlist', function(req, res) {
        var db = req.db;
        var collection = db.get('usercollection');
        collection.find({},{},function(e,docs){
            res.render('userlist', {
                "userlist" : docs
            });
        });
    });
    /* GET About page. */
    app.get('/about', function(req, res, next) {
      res.render('about', { title: 'Gunn FBLA - About' });
    });
    /* GET index page. */
    app.get('/index', function(req, res, next) {
      res.render('home', { title: 'Gunn FBLA - Home' });
    });
    /* GET events page. */
    app.get('/events', function(req, res, next) {
      res.render('events', { title: 'Gunn FBLA - Events' });
    });
	/* GET New User page. */
	app.get('/login', function(req, res) {
		res.render('login', { title: 'Gunn FBLA - Login', message: req.flash('message')});
	});
	app.post('/login', passport.authenticate('login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash : true
	}));
	/* GET New User page. */
	app.get('/registration', function(req, res) {
		res.render('registration', { title: 'Gunn FBLA - User Registration', message: req.flash('message')});
	});
    /* Handle Registration POST */
    app.post('/registration', passport.authenticate('signup', {
		successRedirect: '/profile',
		failureRedirect: '/registration',
		failureFlash : true
	}));
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});
	/* GET Home Page */
	app.get('/profile', isAuthenticated, function(req, res){
		res.render('profile', { title: 'Gunn FBLA - Profile', user: req.user });
	});

    // return app;
}

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}
