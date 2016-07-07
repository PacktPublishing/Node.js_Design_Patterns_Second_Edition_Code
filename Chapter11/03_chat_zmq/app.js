"use strict";

const WebSocketServer = require('ws').Server;
const args = require('minimist')(process.argv.slice(2));
const zmq = require('zmq');

//static file server
const server = require('http').createServer(
  require('ecstatic')({root: `${__dirname}/www`})
);

const pubSocket = zmq.socket('pub');
pubSocket.bind(`tcp://127.0.0.1:${args['pub']}`);

const subSocket = zmq.socket('sub');
const subPorts = [].concat(args['sub']);
subPorts.forEach(p => {
  console.log(`Subscribing to ${p}`);
  subSocket.connect(`tcp://127.0.0.1:${p}`);
});
subSocket.subscribe('chat');

subSocket.on('message', msg => {
  console.log(`From other server: ${msg}`);
  broadcast(msg.toString().split(' ')[1]);
});

const wss = new WebSocketServer({server: server});
wss.on('connection', ws => {
  console.log('Client connected'); 
  ws.on('message', msg => {
    console.log(`Message: ${msg}`);
    broadcast(msg);
    pubSocket.send(`chat ${msg}`);
  });
});

function broadcast(msg) {
  wss.clients.forEach(client => {
    client.send(msg);
  });
}

server.listen(args['http'] || 8080);
