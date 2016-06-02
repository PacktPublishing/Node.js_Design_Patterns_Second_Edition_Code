"use strict";

const Image = require('./image');

module.exports = class ImageGif extends Image {
  constructor(path) {
    if (!path.match(/\.gif/)) {
      throw new Error(`${path} is not a GIF image`);
    }
    super(path);
  }
};
