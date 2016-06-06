"use strict";

const pify = require('pify');  // [1]
const totalSales = pify(require('./totalSales'));

const cache = {};
module.exports = function totalSalesPromises(item) {
  if (cache[item]) {  // [2]
    return cache[item];
  }

  cache[item] = totalSales(item)  // [3]
    .then(res => {  // [4]
      setTimeout(() => {delete cache[item]}, 30 * 1000); //30 seconds expiry
      return res;
    })
    .catch(err => {  // [5]
      delete cache[item];
      throw err;
    });
  return cache[item];  // [6]
};
