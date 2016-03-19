"use strict";

const sublevel = require('level-sublevel');
const level = require('level');
const uuid = require('node-uuid');
const async = require('async');

let db = sublevel(level('example-db', {valueEncoding: 'json'}));
let salesDb = db.sublevel('sales');
let items = ['book', 'game', 'app', 'song', 'movie'];

async.times(100000, (n, callback) => {
  salesDb.put(uuid.v4(), {
    amount: Math.ceil(Math.random() * 100),
    item: items[Math.floor(Math.random() * 5)]
  }, callback);
}, err => {
  if(err) {
    return console.log(err);
  }
  console.log('DB populated');
});
