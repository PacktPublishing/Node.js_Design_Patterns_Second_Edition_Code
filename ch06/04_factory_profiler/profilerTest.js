"use strict";

const profiler = require('./profiler');

function getRandomArray(len) {
  let p = profiler(`Generating a ${len} items long array`);
  p.start();
  let arr = [];
  for(let i = 0; i < len; i++) {
    arr.push(Math.random());
  }
  p.end();
}

getRandomArray(1e6);
console.log('Done');
