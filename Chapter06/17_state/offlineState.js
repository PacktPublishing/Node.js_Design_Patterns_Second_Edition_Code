"use strict";

const jot = require('json-over-tcp');         //[1]

module.exports = class OfflineState {

  constructor (failsafeSocket) {
    this.failsafeSocket = failsafeSocket;
  }

  send(data) {     //[2]
    this.failsafeSocket.queue.push(data);
  }

  activate() {     //[3]
    const retry = () => {
      setTimeout(() => this.activate(), 500);
    };

    this.failsafeSocket.socket = jot.connect(
      this.failsafeSocket.options,
      () => {
        this.failsafeSocket.socket.removeListener('error', retry);
        this.failsafeSocket.changeState('online');
      }
    );
    this.failsafeSocket.socket.once('error', retry);
  }
};
