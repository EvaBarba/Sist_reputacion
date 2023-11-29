// MODULE IMPORT
var createError = require('http-errors');         //manejar errores HTTP
var express = require('express');                 //framework web
var path = require('path');                       //rutas de archivos
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var methodOverride = require('method-override');
var partials = require('express-partials');

var indexRouter = require('./routes/index');

// Creation of the Express application instance
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware configuration
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Configuration of the session to store it in Redis database
app.use(session({secret: "Quiz 2022",
  resave: false,
  saveUninitialized: true}));

app.use(methodOverride('_method', {methods: ["POST", "GET"]}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(partials());


// Dynamic Helper:
app.use(function(req, res, next) {

  // To use req.loginUser in the views
  res.locals.loginUser = req.session.loginUser && {
    id: req.session.loginUser.id,
    username: req.session.loginUser.username,
    isAdmin: req.session.loginUser.isAdmin
  };

  next();
});

// Main router
app.use('/', indexRouter);

// catch 404 and forward to error handler------------
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
