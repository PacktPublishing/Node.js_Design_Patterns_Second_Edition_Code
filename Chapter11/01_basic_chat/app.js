"use strict";

const WebSocketServer = require('ws').Server;

//static file server
const server = require('http').createServer(  //[1]
  require('ecstatic')({root: `${__dirname}/www`})
);

const wss = new WebSocketServer({server: server});  //[2]
wss.on('connection', ws => {
  console.log('Client connected');
  ws.on('message', msg => {  //[3]
    console.log(`Message: ${msg}`);
    broadcast(msg);
  });
});

function broadcast(msg) {  //[4]
  wss.clients.forEach(client => {
    client.send(msg);
  });
}

server.listen(process.argv[2] || 8080);
