"use strict";

let obj = {};
let map = new WeakMap();
map.set(obj, {metadata: "some_metadata"});
console.log(map.get(obj)); // {metadata: "some_metadata"}
obj = undefined; // now obj and metadata will be cleaned up in the next gc cycle
console.log(map.get(obj));