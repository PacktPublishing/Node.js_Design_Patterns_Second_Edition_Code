"use strict";

const request = require('request');
const http = require('http');

const start = Date.now();
let count = 20;
const interval = 200;
let completed = count;
const agent = new http.Agent();
agent.maxSockets = count;
const query = process.argv[2] ? process.argv[2] : 'item=book';
const id = setInterval(() => {
  request({
    url: 'http://localhost:8000?'+query,
    pool: agent
  },
  (err, res) => {
    if (err) return console.log(err);
    console.log(res.statusCode, res.body);
    if (!--completed) {
      console.log(`All completed in: ${Date.now() - start}ms`);
    }
  });
  if (!--count) {
    clearInterval(id);
  }
}, interval);
