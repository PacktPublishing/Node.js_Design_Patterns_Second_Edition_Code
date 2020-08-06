"use strict";

const numbers = [2, 6, 7, 8, 1];
const even = numbers.filter((x) => {
  if (x%2 === 0) {
    console.log(x + ' is even!');
    return true;
  }
});

console.log(even);