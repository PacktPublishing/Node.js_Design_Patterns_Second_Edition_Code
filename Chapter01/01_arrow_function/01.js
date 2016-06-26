"use strict";

var numbers = [2, 6, 7, 8, 1];
var even = numbers.filter(function(x) {
  return x%2 === 0;
});

console.log(even);