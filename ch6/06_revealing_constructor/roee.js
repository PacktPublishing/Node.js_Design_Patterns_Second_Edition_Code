"use strict";

const EventEmitter = require('events');

module.exports = class Roee extends EventEmitter {
  constructor (executor) {
    super();
    let emit = this.emit.bind(this);
    this.emit = undefined;
    executor(emit);
  }
};
