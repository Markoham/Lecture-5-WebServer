var connect = require('connect')
  ,http = require('http');

var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hjs = require('hjs');
var routes = require('./routes/index');
var connectRouter = require('connect-router');

var app = connect();

connectRouter(__dirname + '/routes');


module.exports = app;
