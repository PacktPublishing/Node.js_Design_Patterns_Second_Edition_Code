"use strict";

const Image = require('./image');

function createImage(name) {
  return new Image(name);
}

const image = createImage('photo.jpeg');

console.log(image);
