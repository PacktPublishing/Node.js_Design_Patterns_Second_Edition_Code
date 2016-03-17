"use strict";

function createProxy(subject) {
  let helloOrig = subject.hello;
  subject.hello = () => (helloOrig.call(this) + ' world!');

  return subject;
}


module.exports = createProxy;
