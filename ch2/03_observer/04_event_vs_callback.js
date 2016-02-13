"use strict";

const EventEmitter = require('events').EventEmitter;

function helloEvents() {
  let eventEmitter = new EventEmitter();
  setTimeout(() => eventEmitter.emit('hello', 'hello world'), 100);
  return eventEmitter;
}

function helloCallback(callback) {
  setTimeout(() => callback('hello world'), 100);
}

helloEvents().on('hello', (message) => console.log(message));
helloCallback((message) => console.log(message));
