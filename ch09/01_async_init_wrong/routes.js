"use strict";

const asyncModule = require('./asyncModule');

module.exports.say = (req, res) => {
  asyncModule.tellMeSomething((err, something) => {
    if(err) {
      res.writeHead(500);
      return res.end('Error:' + err.message);
    }
    res.writeHead(200);
    res.end('I say: ' + something);
  });
};
