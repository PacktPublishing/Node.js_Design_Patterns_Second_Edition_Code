"use strict";

module.exports.json = () => {
  return {
    inbound: (message, next) => {
      message.data = JSON.parse(message.data.toString());
      next();
    },
    outbound: (message, next) => {
      message.data = new Buffer(JSON.stringify(message.data));
      next();
    }
  }
};
