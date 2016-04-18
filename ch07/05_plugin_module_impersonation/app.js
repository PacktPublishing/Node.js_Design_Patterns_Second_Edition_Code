var express = require('express');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var http = require('http');

var authController = require('./lib/authController');

var app = module.exports = express();
app.use(bodyParser.json());

require('authsrv-plugin-logout');

app.post('/login', authController.login);
app.get('/checkToken', authController.checkToken);

app.use(errorHandler());
http.createServer(app).listen(3000, function () {
  console.log('Express server started');
});
