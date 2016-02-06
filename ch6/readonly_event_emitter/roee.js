"use strict";

const EventEmitter = require('events');

module.exports = class Roee extends EventEmitter {
  constructor (executor) {
    super();
    var emit = this.emit.bind(this);
    this.emit = undefined;
    executor(emit);
  }
};