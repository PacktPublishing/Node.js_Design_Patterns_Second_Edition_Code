"use strict";

const http = require('http');
const servers = [
  {host: 'localhost', port: '8081'},
  {host: 'localhost', port: '8082'}
];

let i = 0;

module.exports = (options, callback) => {
  i = (i + 1) % servers.length;
  options.hostname = servers[i].host;
  options.port = servers[i].port;
  
  return http.request(options, callback);
};
