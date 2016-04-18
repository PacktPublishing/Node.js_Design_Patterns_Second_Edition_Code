var express = require('express');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var http = require('http');

var app = module.exports = express();
app.use(bodyParser.json());

var dbFactory = require('./lib/db');
var authServiceFactory = require('./lib/authService');
var authControllerFactory = require('./lib/authController');

var db = dbFactory('example-db');
var authService = authServiceFactory(db, 'SHHH!');
var authController = authControllerFactory(authService);

//initialize plugin
require('authsrv-plugin-logout')(app, authService, db);

app.post('/login', authController.login);
app.get('/checkToken', authController.checkToken);


app.use(errorHandler());
http.createServer(app).listen(3000, function () {
  console.log('Express server started');
});
