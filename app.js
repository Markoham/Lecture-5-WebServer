var connect = require('connect');
var serveStatic = require('serve-static');
//var connectRouter = require('connect-router');
var validator = require('validator');
var mailer = require('./lib/mailer');

var app = connect();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(serveStatic('public'));

require('./routes')(app);

module.exports = app;
