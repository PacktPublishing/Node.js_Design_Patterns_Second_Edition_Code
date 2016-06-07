"use strict";

const amqp = require('amqplib');

class AMQPReply {
  constructor(qName) {
    this.qName = qName;
  }

  initialize() {
    return amqp
      .connect('amqp://localhost')
      .then(conn => conn.createChannel())
      .then(channel => {
        this.channel = channel;
        return this.channel.assertQueue(this.qName);
      })
      .then(q => this.queue = q.queue)
      .catch(err => console.log(err.stack))
    ;
  }

  handleRequest(handler) {
    return this.channel.consume(this.queue, msg => {
      const content = JSON.parse(msg.content.toString());
      handler(content, reply => {
        this.channel.sendToQueue(
          msg.properties.replyTo,
          new Buffer(JSON.stringify(reply)),
          {correlationId: msg.properties.correlationId}
        );
        this.channel.ack(msg);
      });
    });
  }
}

module.exports = (excName, qName, pattern) => {
  return new AMQPReply(excName, qName, pattern);
};
