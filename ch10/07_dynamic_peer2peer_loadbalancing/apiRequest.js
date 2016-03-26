"use strict";

const request = require('request');
const seaport = require('seaport').connect('localhost', 9090);

let i = 0;
let queue = [];

//Seaport retrieves the server list asyncronously
//So we implement a pre-initialization queue pattern
//to not loose any client connection
seaport.on('synced', () => {
  queue.forEach(args => {
    module.exports.apply(null, args);
  });
});

module.exports = (path, cb) => {
  let servers = seaport.query('api-service');
  if (!servers.length) {
    return queue.push([path, cb]);
  }
  i = (i + 1) % servers.length;
  let url = 'http://' + servers[i].host + ':' +
    servers[i].port + path;
  request(url, cb);
};
