"use strict";

const totalSales = require('./totalSales');

let queues = {};
let cache = {};

module.exports = function totalSalesBatch(item, callback) {
  let cached = cache[item];
  if (cached) {
    console.log('Cache hit');
    return process.nextTick(callback.bind(null, null, cached));
  }
  
  if (queues[item]) {
    console.log('Batching operation');
    return queues[item].push(callback);
  }
  
  queues[item] = [callback];
  totalSales(item, (err, res) => {
    if (!err) {
      cache[item] = res;
      setTimeout(() => {
        delete cache[item];
      }, 30 * 1000); //30 seconds expiry
    }
    
    let queue = queues[item];
    queues[item] = null;
    queue.forEach(cb => cb(err, res));
  });
};
