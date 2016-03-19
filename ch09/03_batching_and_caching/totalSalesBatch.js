"use strict";

const totalSales = require('./totalSales');

let queues = {};
module.exports = function totalSalesBatch(item, callback) {
  if(queues[item]) {  // [1]
    console.log('Batching operation');
    return queues[item].push(callback);
  }
  
  queues[item] = [callback];  // [2]
  totalSales(item, (err, res) => {
    var queue = queues[item];  // [3]
    queues[item] = null;
    queue.forEach(cb => cb(err, res));
  });
};
