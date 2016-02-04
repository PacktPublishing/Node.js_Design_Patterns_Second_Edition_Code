"use strict";

module.exports.json = () => {
  return {
    inbound: function (message, next) {
      message.data = JSON.parse(message.data.toString());
      next();
    },
    outbound: function (message, next) {
      message.data = new Buffer(JSON.stringify(message.data));
      next();
    }
  }
};
