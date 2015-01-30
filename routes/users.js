var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var db = mongoose.connection;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

var User = db.model("user");

/**
req.body{
	userID:String
}
*/
router.post('/add', function(req, res, next) {
  //var userID = req.body.userID;
	console.log('client:add user');
	var iuser = new User(req.body); 
	iuser.save(function(err){
	if(!err){
		return res.send(iuser);
	}
	res.send(err);
  })
});


module.exports = router;
