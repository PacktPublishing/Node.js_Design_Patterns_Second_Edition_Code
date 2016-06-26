"use strict";

const WebSocketServer = require('ws').Server;
const amqp = require('amqplib');
const JSONStream = require('JSONStream');
const request = require('request');
let httpPort = process.argv[2] || 8080;

//static file server 
const server = require('http').createServer(
  require('ecstatic')({root: `${__dirname}/www`})
);

let channel, queue;
amqp
  .connect('amqp://localhost')
  .then(conn => conn.createChannel())
  .then(ch => {
    channel = ch;
    return channel.assertExchange('chat', 'fanout');
  })
  .then(() => {
    return channel.assertQueue(`chat_srv_${httpPort}`, {exclusive: true});
  })
  .then(q => {
    queue = q.queue;
    return channel.bindQueue(queue, 'chat');
  })
  .then(() => {
    return channel.consume(queue, msg => {
      msg = msg.content.toString();
      console.log('From queue: ' + msg);
      broadcast(msg);
    }, {noAck: true});
  })
  .catch(err => console.log(err))
;

const wss = new WebSocketServer({server: server});
wss.on('connection', ws => {
  console.log('Client connected');
  //query the history service
  request('http://localhost:8090')
    .on('error', err => console.log(err))
    .pipe(JSONStream.parse('*'))
    .on('data', msg => ws.send(msg))
  ;
    
  ws.on('message', msg => {
    console.log(`Message: ${msg}`);
    channel.publish('chat', '', new Buffer(msg));
  }); 
}); 

function broadcast(msg) {
  wss.clients.forEach(client => client.send(msg));
}

server.listen(httpPort);
