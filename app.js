var connect = require('connect')
  ,http = require('http');
var serveStatic = require('serve-static');
//var connectRouter = require('connect-router');
var validator = require('validator');
var mailer = require('./lib/mailer');

var app = connect();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(serveStatic('public'));

app.use('/sendFeedback', function(req, res){
    if(req.method === "POST")
    {
      console.log(req.body);
      var resObj = {
        message: '',
        success: true,
        error: []
      }

      if(!req.body.name){
          resObj.error.push("Missing name");
          resObj.success = false;
      }
      if(!req.body.email || !validator.isEmail(req.body.email)){
        resObj.error.push("Missing or invalid email");
        resObj.success = false;

      }

      if(!req.body.feedback){
        resObj.error.push("Missing feedback");
        resObj.success = false;
      }

      if(resObj.success){
        var mailOptions = {
          to: "marko.hamppula@metropolia.fi",
          from: req.body.name + ' <' + req.body.email + '>',
          subject: 	'Feedback from test site',
          text: req.body.feedback
        };
        mailer.send(mailOptions, function(err) {
            if (err)
            {
                resObj.success = false;
                resObj.error.email = err;
                res.writeHead(403, {'Location': '/feedback'});
                return res.end(JSON.stringify(resObj));
            }
            res.writeHead(302, {'Location': '/feedback'});
            return res.end(JSON.stringify(resObj));
        });
        resObj.message = "Feedback sent successfully";
        res.status(200).end(JSON.stringify(resObj));
      }
      else{
        res.writeHead(403, {'Location': '/feedback'});
        res.end(JSON.stringify(resObj));
      }
    }
});
        
app.use('/feedback', function(req, res){
    res.write("<!DOCTYPE html>");
    res.write("<html>");
    res.write("<head>");
    res.write("<title>Tack</title>");
    res.write("</head>");
    res.write("<body>");
    res.write("<h1>Tack</h1>");
    res.write("<img src='/anim.gif'>");
    res.write("</body>");
    res.write("</html>");
    res.end("");
});
//connectRouter(__dirname + '/routes');

app.use('/', function(req, res){
    res.write("<!DOCTYPE html>");
    res.write("<html>");
    res.write("<head>");
    res.write("<title>Feedback</title>");
    res.write("<link rel='stylesheet' href='/stylesheets/style.css' />");
    res.write("</head>");
    res.write("<body>");
    res.write("<h1>Send Feedback</h1>");
    res.write("<form method='POST' action='/sendFeedback'>");
    res.write("<p>Name:<br /><input type='text' name='name' placeholder='Name' required /></p>");
    res.write("<p>Email:<br /><input type='email' name='email' placeholder='Email' required /></p>");
    res.write("<p>Feedback:<br /><textarea name='feedback' required></textarea></p>");
    res.write("<p><button type='submit'>Send</button></p>");
    res.write("</form>");
    res.write("</body>");
    res.write("</html>");
    res.end("");
});

module.exports = app;
