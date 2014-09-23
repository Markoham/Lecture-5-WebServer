var express = require('express');
var router = express.Router();
var validator = require('validator');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/sendForm', function(req,res){

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
    resObj.message = "Feedback sent successfully";
    res.status(200).send(resObj);
  }
  else{
    res.status.(403).send(resObj);
  }

});

module.exports = router;
