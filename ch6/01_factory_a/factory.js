"use strict";

const Image = require('./image');

function createImage(name) {
  return new Image(name);
}

let image = createImage('photo.jpeg');

console.log(image);
