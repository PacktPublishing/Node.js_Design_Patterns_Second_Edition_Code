"use strict";

const zmq  = require('zmq');
const sink = zmq.socket('pull');
sink.bindSync("tcp://*:5017");

sink.on('message', buffer => {
  console.log('Message from worker: ', buffer.toString());
});
