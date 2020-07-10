var express = require('express');
var app = express();
var router = express.Router();

var multer = require('multer');
var upload = multer({dest:'./public/uploads/'});

var controller = require('../controller/controller.js');
var validateUser = require('../validate/user');
router.get('/', validateUser.requiredAuth, controller.index);
router.get('/cookie', function(req, res){
	res.cookie('user-id', 123456)
	res.send('đã sét cookie');
});

router.get('/view/:id', validateUser.requiredAuth, controller.view);
router.get('/search', validateUser.requiredAuth, controller.search);
router.get('/create', validateUser.requiredAuth, controller.userCreat);
router.post('/create',
	upload.single('avatar'),
	validateUser.postCreat,
	controller.pushCreat
);
function mid1(req, res, next){
	console.log('mid1');
	next();
}
function mid2(req, res, next){
	console.log('mid2');
	res.send('haha');
}
router.get('/test', mid1, mid2);
module.exports = router;