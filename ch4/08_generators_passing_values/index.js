"use strict";

function* twoWayGenerator() {
  let what = yield null;
  console.log('Hello ' + what);
}

let twoWay = twoWayGenerator();
twoWay.next();
twoWay.next('world');
