"use strict";

function* fruitGenerator() {
  yield 'apple';
  yield 'orange';
  return 'watermelon';
}

const newFruitGenerator = fruitGenerator();
console.log(newFruitGenerator.next());    //[1]
console.log(newFruitGenerator.next());    //[2]
console.log(newFruitGenerator.next());    //[3]
