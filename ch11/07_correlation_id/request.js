"use strict";

const uuid = require('node-uuid');

module.exports = channel => {
  let idToCallbackMap = {};  // [1]
  
  channel.on('message', message => {  // [2]
    var handler = idToCallbackMap[message.inReplyTo];
    if(handler) {
      handler(message.data);
    }
  });
  
  return function sendRequest(req, callback) {  // [3]
    let correlationId = uuid.v4();
    idToCallbackMap[correlationId] = callback;
    channel.send({
      type: 'request',
      data: req,
      id: correlationId
    });
  };
};
