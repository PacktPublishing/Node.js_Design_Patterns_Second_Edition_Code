var express = require('express');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var http = require('http');

var app = module.exports = express();
app.use(bodyParser.json());

//Use the express app instance as service locator
app.set('dbName', 'example-db');
app.set('tokenSecret', 'SHHH!');
app.set('db', require('./lib/db')(app));
app.set('authService', require('./lib/authService')(app));

var authController = require('./lib/authController');

app.post('/login', authController.login);
app.get('/checkToken', authController.checkToken);


app.use(errorHandler());
http.createServer(app).listen(3000, function () {
  console.log('Express server started');
});
