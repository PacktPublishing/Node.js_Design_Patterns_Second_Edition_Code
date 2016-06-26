"use strict";

const Image = require('./image');

module.exports = class ImagePng extends Image {
  constructor(path) {
    if (!path.match(/\.png$/)) {
      throw new Error(`${path} is not a PNG image`);
    }
    super(path);
  }
};
