"use strict";

const http = require('http');
const pid = process.pid;
const ports = require('seaport').connect('localhost', 9090);
let serviceType = process.argv[2];

console.log(ports.registerMeta(serviceType));
process.exit(0);

http.createServer((req, res) => {
  for (let i = 1e7; i > 0; i--) {}
  console.log(`Handling request from ${pid}`);
  res.end(`${serviceType} response from ${pid}\n`);
}).listen(ports.register(serviceType), () => {
  console.log(`Started ${pid}`);
});
