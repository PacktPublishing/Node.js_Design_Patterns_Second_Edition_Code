"use strict";

const http = require('http');
const httpProxy = require('http-proxy');
const seaport = require('seaport').connect('localhost', 9090);

let routing = [
  {
    path: '/api',
    service: 'api-service',
    index: 0
  },
  {
    path: '/',
    service: 'webapp-service',
    index: 0
  }
];

const proxy = httpProxy.createProxyServer({});
http.createServer((req, res) => {
  let route;
  routing.some(entry => {
    route = entry;
    //Starts with the route path?
    return req.url.indexOf(route.path) === 0;
  });
  
  let servers = seaport.query(route.service);
  if (!servers.length) {
    res.writeHead(502);
    return res.end('Bad gateway');
  }

  route.index = (route.index + 1) % servers.length;
  proxy.web(req, res, {target: servers[route.index]});
}).listen(8080, () => console.log('Started'));
