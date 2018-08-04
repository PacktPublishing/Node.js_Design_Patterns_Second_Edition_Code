"use strict";

const promisify = require('./promisify.js');

const delayedDivision = (dividend, divisor, cb) => {
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


const promisifiedDivision = promisify(delayedDivision);

promisifiedDivision(10, 2)
  .then((value) => console.log(value))
  .catch((error) => console.log(error))
;

promisifiedDivision(10, 0)
  .then((value) => console.log(value))
  .catch((error) => console.log(error))
;

const delayedMultiDivision = (numA, numB, numC, cb) => {
  setTimeout(() => {
    cb(null, numA/2, numB/2, numC/2);
  }, 1000);
};

const promisifiedMultiDivision = promisify(delayedMultiDivision);

promisifiedMultiDivision(7, 12, 542)
  .then((value) => console.log(value))
  .catch((error) => console.log(error))
;
