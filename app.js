var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var validator = require('validator');
var mongoose = require('mongodb');
var monk = require('monk')
var db = monk('localhost:27017/data');

var routes = require('./routes/index');
var profile = require('./routes/profile');

var app = express();

//export NODE_ENV=production for production

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 3000);

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    req.validator = validator;
    next();
});
app.use('/', routes);
app.use('/profile', profile);

var listener = app.listen(app.get('port'), function(){
    console.log('Listening on port http://localhost:' + listener.address().port); //Listening on port 8888
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
console.log(app.get('env'));
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status).render(err.status, {title: "Sorry, page not found"});
});

module.exports = app;
