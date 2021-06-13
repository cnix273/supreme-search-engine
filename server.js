// Dependencies
// ============
const express        = require('express');
// const fs             = require('fs');
const path           = require('path');
const exphbs         = require('express-handlebars');
const debug          = require('debug')('express-example');

const application    = require('./routes/application');
const users          = require('./routes/users');

// Express settings
// ================

// Instantiate our app
var app = express();
var PORT = process.env.PORT || 8080;

// View Engine Setup
app.set('views', path.join(__dirname, 'views'));

// // Set up handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// .env configuration
require('dotenv').config();
const api_key = process.env.HUBSPOT_API_KEY;

// // Set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use('/', routes);
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', application);
// app.use('/users', users);

// // catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  })
});

app.set('port', process.env.PORT || 8080);
const server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});

// our module get's exported as app.
module.exports = app;