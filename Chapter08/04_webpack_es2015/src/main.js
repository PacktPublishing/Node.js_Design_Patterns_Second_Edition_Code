"use strict";

window.addEventListener('load', () => {
  const sayHello = require('./sayHello').sayHello;
  let hello = sayHello('Browser!');
  let body = document.getElementsByTagName("body")[0];
  body.innerHTML = hello;
});
