"use strict";

const createProxy = require('./createProxy');

class Greeter {
  hello() {
    return 'Hello';
  }

  goodbye() {
    return 'Goodbye';
  }
}

let greeter = new Greeter();
let proxy = createProxy(greeter);

console.log(proxy.hello());
console.log(proxy.goodbye());
