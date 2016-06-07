"use strict";

const uuid = require('node-uuid');
const amqp = require('amqplib');

class AMQPRequest {
  constructor() {
    this.idToCallbackMap = {};
  }

  initialize() {
    return amqp
      .connect('amqp://localhost')
      .then(conn => conn.createChannel())
      .then(channel => {
        this.channel = channel;
        return channel.assertQueue('', {exclusive: true});
      })
      .then(q => {
        this.replyQueue = q.queue;
        return this._listenForResponses();
      })
      .catch(function(err) {
        console.log(err);
      })
    ;
  }

  _listenForResponses() {
    return this.channel.consume(this.replyQueue, msg => {
      const correlationId = msg.properties.correlationId;
      const handler = this.idToCallbackMap[correlationId];
      if (handler) {
        handler(JSON.parse(msg.content.toString()));
      }
    }, {noAck: true});
  }

  request(queue, message, callback) {
    const id = uuid.v4();
    this.idToCallbackMap[id] = callback;
    this.channel.sendToQueue(queue,
      new Buffer(JSON.stringify(message)),
      {correlationId: id, replyTo: this.replyQueue}
    );
  }
}

module.exports = () => new AMQPRequest();
