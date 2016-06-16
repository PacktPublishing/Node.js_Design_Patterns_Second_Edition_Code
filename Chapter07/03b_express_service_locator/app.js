"use strict";

const Express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const http = require('http');

const app = module.exports = new Express();
app.use(bodyParser.json());

//Use the express app instance as service locator
app.set('dbName', 'example-db');
app.set('tokenSecret', 'SHHH!');
app.set('db', require('./lib/db')(app));
app.set('authService', require('./lib/authService')(app));

const authController = require('./lib/authController');

app.post('/login', authController.login);
app.get('/checkToken', authController.checkToken);

app.use(errorHandler());
http.createServer(app).listen(3000, () => {
  console.log('Express server started');
});
