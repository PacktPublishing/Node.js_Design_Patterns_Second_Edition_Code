"use strict";

var numbers = [2, 6, 7, 8, 1];
var even = numbers.filter((x) => {
  if (x%2 === 0) {
    console.log(x + ' is even!');
    return true;
  }
});

console.log(even);