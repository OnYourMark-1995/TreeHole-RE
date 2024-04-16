var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));

app.use('/', indexRouter);
app.use('/user', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  /* res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; */
  const errorMessage = err.message;
  const error = req.app.get('env') === 'development' ? err : {};

  // return the error message
  res.status(err.status || 500);
  res.send("Error: "+ errorMessage + "; ");
  if(JSON.stringify(error) !== "{}"){
    res.send(JSON.stringify(error))
  }
});

module.exports = app;