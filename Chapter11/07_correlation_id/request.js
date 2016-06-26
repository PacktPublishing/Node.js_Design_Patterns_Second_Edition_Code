"use strict";

const uuid = require('node-uuid');

module.exports = channel => {
  const idToCallbackMap = {};  // [1]
  
  channel.on('message', message => {  // [2]
    const handler = idToCallbackMap[message.inReplyTo];
    if(handler) {
      handler(message.data);
    }
  });
  
  return function sendRequest(req, callback) {  // [3]
    const correlationId = uuid.v4();
    idToCallbackMap[correlationId] = callback;
    channel.send({
      type: 'request',
      data: req,
      id: correlationId
    });
  };
};
