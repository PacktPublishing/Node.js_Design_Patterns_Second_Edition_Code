"use strict";

const amqp = require('amqplib');

let channel, queue;
amqp
  .connect('amqp://localhost')
  .then(conn => conn.createChannel())
  .then(ch => {
    channel = ch;
    return channel.assertQueue('results_queue');
  })
  .then(q => {
    queue = q.queue;
    channel.consume(queue, msg => {
      console.log('Message from worker: ', msg.content.toString());
    });
  })
  .catch(err => console.log(err.stack))
;
