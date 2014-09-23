var connect = require('connect')
  ,http = require('http');
//var connectRouter = require('connect-router');

var app = connect();

app.use('/', function(req, res){
  res.end('Welcome to Connect!\n');
});
//connectRouter(__dirname + '/routes');


module.exports = http.createServer(app).listen(3000);
