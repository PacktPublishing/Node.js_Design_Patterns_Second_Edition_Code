"use strict";

const http = require('http');
const SubsetSum = require('./subsetSum');
//const SubsetSum = require('./subsetSumDefer');
//const SubsetSum = require('./subsetSumFork');

http.createServer((req, res) => {
  let url = require('url').parse(req.url, true);
  if(url.pathname === '/subsetSum') {
    let data = JSON.parse(url.query.data);
    res.writeHead(200);
    let subsetSum = new SubsetSum(url.query.sum, data);
    subsetSum.on('match', match => {
      res.write('Match: ' + JSON.stringify(match) + '\n');
    });
    subsetSum.on('end', () => res.end());
    subsetSum.start();
  } else {
    res.writeHead(200);
    res.end('I\m alive!\n');
  }
}).listen(8000, () => console.log('Started'));
