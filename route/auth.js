var express = require('express');
var app = express();
var router = express.Router();

var controller = require('../controller/auth.js');
var validateUser = require('../validate/user');

router.get('/login', controller.login);
router.post('/login', controller.postLogin);
module.exports = router;