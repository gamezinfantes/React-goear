var bodyParser = require('body-parser');
var compression = require('compression')
var cookieParser = require('cookie-parser');
var express = require('express');
var favicon = require('serve-favicon');
var flash   = require('connect-flash');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var path = require('path');
// var session = require('express-session');

var config = require('./config');

/*
 * Client modules
 */
var React = require('react'),
    ReactDOM = require('react-dom/server'),
    ReactRouter = require('react-router'),
    clientRoutes = require('../client/js/routes.jsx');

// Routes
var routes = require('./routes/index');
var apiRoutes = require('./routes/api');
var users = require('./routes/users');

var app = express();

// connect to our database
// mongoose.connect(config.mongodbUrl);

// Enable gzip compression
app.use(compression());


// // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('jwt-key', config.jwtKey);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


var staticPath = path.resolve('__dirname', '..');
staticPath = path.join(staticPath, 'build', 'public');
app.use(express.static(staticPath));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(staticPath, 'favicon.ico')));

require('./configPassport')(passport); // pass passport for configuration
// app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


app.use('/', routes);
app.use('/api', apiRoutes);
app.use('/users', users);


// client routes with react router
// https://github.com/rackt/react-router/blob/master/docs/guides/advanced/ServerRendering.md
app.use(function(req, res, next) {
  ReactRouter.match({ routes: clientRoutes, location: req.url }, function(error, redirectLocation, renderProps){
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      var html = ReactDOM.renderToString(<ReactRouter.RoutingContext {...renderProps} />)
      // Isomorfic render
      // res.render('layout', { htmlWrapper: html });
      res.render('layout');
    } else {
      next();
    }
  })
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
