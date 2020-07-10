var db = require('../db');
var hehe = function(req,res){
	res.render('index', {
		users:db.get('users').value(), 
		name:''
	});
}
module.exports.index = hehe;

module.exports.view = function(req,res){
	var id = req.params.id;
	var users = db.get('users').find({'id':id}).value();
	res.render('view', {
		users:users
	})
};

module.exports.search = function(req,res){
	var name = req.query.name;
	if(name != null){
		var match = db.get('users').value().filter(function(user){
			return user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1;
		});
		res.render('index', {
			users:match,name:name
		});
	}};
module.exports.pushCreat = function(req,res){
	req.body.avatar = req.file.path.split('\\').slice(1).join('/');
	db.get('users').push(req.body).write();
	res.redirect('/');
	// console.log(err);
};

module.exports.userCreat = function(req,res){
	res.render('./create');
};