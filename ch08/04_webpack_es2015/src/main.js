"use strict";

window.addEventListener('load', () => {
  const sayHello = require('./sayHello').sayHello;
  const hello = sayHello('Browser!');
  const body = document.getElementsByTagName("body")[0];
  body.innerHTML = hello;
});
