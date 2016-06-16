"use strict";

function add(a, b) {
  return a + b;
}

function add(a, b, callback) {
  callback(a + b);
}

console.log('before');
add(1, 2, result => console.log('Result: ' + result));
console.log('after');
