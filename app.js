var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config(); // allows access to the .env file to retrieve credentials.
const mongoose = require('mongoose') 


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var groceryRouter = require('./routes/grocery');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', authRouter);
app.use('/', groceryRouter);

// Connect to mongoDB
mongoose.connect(process.env.MONGODB_CONNECT) // start the connection with mongodb.
let mongoDB = mongoose.connection // so the connection can be exported
mongoDB.on('error', console.error.bind(console, 'mongodb connection error!!')) // notifies on error
mongoDB.once('open', () =>{ // notifies once the mongodb connection is open.
  console.log('connected to mongodb')
})


// catch 404 and forward to error handler
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
module.exports = mongoDB;