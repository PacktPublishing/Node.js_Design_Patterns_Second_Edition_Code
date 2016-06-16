"use strict";

const http = require('http');

http.createServer((request, response) => {
  if(request.url !== '/cmd') {
    response.writeHead(400);
    response.end();
  }

  let data = '';

  request.on('data', chunk => {
    data += chunk;
  });

  request.on('end', () => {
    console.log('Received the command: ', data);
    
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ok: true}));
  });
}).listen(3000, () => {console.log('Started')});
