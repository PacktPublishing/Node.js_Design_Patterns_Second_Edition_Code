"use strict";

const http = require('http');
const pid = process.pid;

http.createServer((req, res) => {
  for (let i = 1e7; i > 0; i--) {}
  console.log(`Handling request from ${pid}`);
  res.end(`Hello from ${pid}\n`);
}).listen(8080, () => {
  console.log(`Started ${pid}`);
});

//Crash randomly
setTimeout(() => {
  throw new Error('Ooops');
}, Math.ceil(Math.random() * 3) * 1000);
