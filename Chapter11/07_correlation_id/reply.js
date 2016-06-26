"use strict";

module.exports = channel =>
{
  return function registerHandler(handler) {
    channel.on('message', message => {
      if (message.type !== 'request') return;
      handler(message.data, reply => {
        channel.send({
          type: 'response',
          data: reply,
          inReplyTo: message.id
        });
      });
    });
  };
};
