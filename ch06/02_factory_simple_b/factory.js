"use strict";

const ImageJpeg = require('./imageJpeg');
const ImageGif = require('./imageGif');
const ImagePng = require('./imagePng');

function createImage(name) {
  if(name.match(/\.jpe?g$/)) {
    return new ImageJpeg(name);
  } else if(name.match(/\.gif$/)) {
    return new ImageGif(name);
  } else if(name.match(/\.png$/)) {
    return new ImagePng(name);
  } else {
    throw new Exception('Unsupported format');
  }
}

let image1 = createImage('photo.jpg');
let image2 = createImage('photo.gif');
let image3 = createImage('photo.png');

console.log(image1, image2, image3);

//This will fail
//let image4 = createImage('photo.psd'); 
