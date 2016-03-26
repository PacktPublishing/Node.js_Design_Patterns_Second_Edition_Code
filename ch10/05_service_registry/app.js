"use strict";

const http = require('http');
const pid = process.pid;
const seaport = require('seaport').connect('localhost', 9090);
const serviceType = process.argv[2];
const port = seaport.register(serviceType);

http.createServer((req, res) => {
  for (let i = 1e7; i > 0; i--) {}
  console.log(`Handling request from ${pid}`);
  res.end(`${serviceType} response from ${pid}\n`);
}).listen(port, () => {
  console.log(`Started ${pid} on port ${port}`);
});
