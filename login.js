var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var connection = mysql.createConnection({
	host     : '192.168.33.34',
	user     : 'worker',
	password : 'userpass',
	database : 'userDatabase'
});

var app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/welcome.html'));
});

app.get('/login', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});
app.get('/timer', function(request, response) {
	response.sendFile(path.join(__dirname + '/timer.html'));
});
app.get('/loginnav', function(request, response) {
	response.sendFile(path.join(__dirname + '/loginnav.html'));
});
app.get('/friends', function(request, response) {
	response.sendFile(path.join(__dirname + '/friends.html'));
});


app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM allUsers WHERE userID = ? AND userPassword = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});


app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.redirect('/loginnav')
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

app.listen(3000);