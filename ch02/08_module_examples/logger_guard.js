"use strict";

const LoggerConstructor = require('./logger_constructor');

function Logger(name) {
  if(!(this instanceof Logger)) {
    return new LoggerConstructor(name);
  }
  this.name = name;
}

module.exports = Logger;
