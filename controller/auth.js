var db = require('../db');
var md5 = require('md5');
module.exports.login = function(req,res){
	res.render('auth/login');
};

module.exports.postLogin = function(req, res){
	var id = req.body.id;
	var pass = req.body.pass;
	var hashedPass = md5(pass);
	var user = db.get('users').find({id: id}).value();
	if (!user) {
		res.render('auth/login', {
			errors: [
			'user does not exist'],
			values:req.body
		});
		return;
	}

	if (md5(user.pass) !== hashedPass) {
		res.render('auth/login', {
			errors:[
			'wrong pass'],
			values:req.body
		});
		return;
	}
res.cookie('userId', user.id, {
	signed: true
});
res.redirect('/');
};