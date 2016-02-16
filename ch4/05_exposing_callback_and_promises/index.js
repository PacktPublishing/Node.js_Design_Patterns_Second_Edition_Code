"use strict";

module.exports = function asyncDivision (dividend, divisor, cb) {
  return new Promise((resolve, reject) => {

    process.nextTick(() => {
      if (
        typeof dividend !== 'number' ||
        typeof divisor !== 'number' ||
        divisor === 0
      ){
        let error = new Error('Invalid operands');
        if (cb) { cb(error); }
        reject(error);
      }

      var result = dividend/divisor;
      if (cb) { cb(null, result); }
      resolve(result);
    });

  });
};
