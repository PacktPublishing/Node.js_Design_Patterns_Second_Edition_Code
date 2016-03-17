"use strict";

const promisify = require('./promisify.js');

let delayedDivision = (dividend, divisor, cb) => {
  setTimeout(() => {
    if (
      typeof dividend !== 'number' ||
      typeof divisor !== 'number' ||
      divisor === 0
    ){
      cb(new Error('Invalid operands'));
    }

    cb(null, dividend/divisor);
  }, 1000);
};


let promisifiedDivision = promisify(delayedDivision);

promisifiedDivision(10, 2)
  .then((value) => console.log(value))
  .catch((error) => console.log(error))
;

promisifiedDivision(10, 0)
  .then((value) => console.log(value))
  .catch((error) => console.log(error))
;
