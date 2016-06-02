"use strict";


module.exports = class ZmqMiddlewareManager {
  constructor(socket) {
    this.socket = socket;
    this.inboundMiddleware = [];           //[1]
    this.outboundMiddleware = [];
    socket.on('message', message => {       //[2]
      this.executeMiddleware(this.inboundMiddleware, {
        data: message
      });
    });
  }

  send(data) {
    const message = {
      data: data
    };

    this.executeMiddleware(this.outboundMiddleware, message,
      () => {
        this.socket.send(message.data);
      }
    );
  }

  use(middleware) {
    if (middleware.inbound) {
      this.inboundMiddleware.push(middleware.inbound);
    }
    if (middleware.outbound) {
      this.outboundMiddleware.unshift(middleware.outbound);
    }
  }

  executeMiddleware(middleware, arg, finish) {
    function iterator(index) {
      if (index === middleware.length) {
        return finish && finish();
      }
      middleware[index].call(this, arg, err => {
        if (err) {
          return console.log('There was an error: ' + err.message);
        }
        iterator.call(this, ++index);
      });
    }

    iterator.call(this, 0);
  }
};
