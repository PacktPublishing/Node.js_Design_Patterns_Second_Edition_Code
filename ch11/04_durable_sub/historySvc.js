"use strict";

const level = require('level');
const timestamp = require('monotonic-timestamp');
const JSONStream = require('JSONStream');
const amqp = require('amqplib');
const db = level('./msgHistory');

require('http').createServer((req, res) => {
  res.writeHead(200);
  db.createValueStream()
    .pipe(JSONStream.stringify())
    .pipe(res);
}).listen(8090);

let channel, queue;
amqp
  .connect('amqp://localhost')  // [1]
  .then(conn => conn.createChannel())
  .then(ch => {
    channel = ch;
    return channel.assertExchange('chat', 'fanout');  // [2]
  })
  .then(() => channel.assertQueue('chat_history'))  // [3]
  .then((q) => {
    queue = q.queue;
    return channel.bindQueue(queue, 'chat');  // [4]
  })
  .then(() => {
    return channel.consume(queue, msg => {  // [5]
      const content = msg.content.toString();
      console.log(`Saving message: ${content}`);
      db.put(timestamp(), content, err => {
        if (!err) channel.ack(msg);
      });
    });
  })
  .catch(err => console.log(err))
;
