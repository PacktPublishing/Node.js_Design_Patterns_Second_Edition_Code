"use strict";

let obj1 = {key: "val1"};
let obj2 = {key: "val2"};
const set = new WeakSet([obj1, obj2]);

console.log(set.has(obj1)); // true
obj1 = undefined; // now obj1 will be removed from the set
console.log(set.has(obj1)); // false
