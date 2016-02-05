"use strict";

var app = require('koa')();

app.use(require('./rateLimit'));

app.use(function *(){
  this.body = {"now": new Date()};
});

app.listen(3000);