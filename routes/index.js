var express = require('express');
var router = express.Router();
var validator = require('validator');
var mailer = require('../lib/mailer'),

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.on('validate/token', function(req, res, next) {

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
      to: resObj.email,
      from: 'Lähettäjä <marko@onparas.com>',
      subject: 	'Feedback from test site',
      text: res.Obj.message
    };
    mailer.send(mailOptions, function(err) {
      if (err) console.log(err);

      return res.redirect('/');
  	});
    resObj.message = "Feedback sent successfully";
    res.status(200).send(resObj);
    next();
  }
  else{
    res.status(403).send(resObj);
  }

});

module.exports = router;
