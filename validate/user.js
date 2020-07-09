var db = require('../db');
var md5 = require('md5');
module.exports.postCreat = function(req,res,next){
	var err = [];
	if(!req.body.name){
		err.push('Name is required !');
	}
	if(!req.body.id){
		err.push('ID is required !');
	}
	if(db.get('users').value().find(function(e){
		return e.id == req.body.id;
		}) != null){
		err.push('ID is exits !');
	}
	if(err.length > 0){
		res.render('create', {err:err, value:req.body});

	} else{
		next();
	}
	// console.log(err);
};

module.exports.requiredAuth = function(req, res, next){
	if(!req.signedCookies.userId){
		res.redirect('auth/login');
		return;
	}
	var user = db.get('users').find({id:req.signedCookies.userId}).value();
	if(!user){
		res.redirect('auth/login');
		return;
	}
	next();
}