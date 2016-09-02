var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
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
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});
/* GET About page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});
/* GET index page. */
router.get('/index', function(req, res, next) {
  res.render('home', { title: 'About' });
});
/* GET events page. */
router.get('/events', function(req, res, next) {
  res.render('events', { title: 'About' });
});
/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;
    var validator = req.validator;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;
    if (validator.isEmail(userEmail)) {
        // Set our collection
        var collection = db.get('usercollection');

        // Submit to the DB
        collection.insert({
            "username" : userName,
            "email" : userEmail
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // And forward to success page
                res.redirect("userlist");
            }
        });
    }
    else {
        console.log("Bad Email, not adding to database");
        res.redirect('back')
    }
});
module.exports = router;
