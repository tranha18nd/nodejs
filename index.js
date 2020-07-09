var express = require('express');
var routerUser = require('./route/user.js');
var cookieParser = require('cookie-parser');
var authRouter = require('./route/auth.js');
// var controller = require('./controller/controller.js');
var app = express();
var port = 3000;

app.set('views', 'views');
app.set('view engine', 'pug');
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser(process.env.SESSION_SECRET));
// ddeer lua data form vao req.body
app.use('/', routerUser);
app.use('/auth', authRouter);
// app.get('/creat', controller.userCreat);
app.listen(port, function(){
	console.log('Sever start with port 3000');
});