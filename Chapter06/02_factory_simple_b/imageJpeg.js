"use strict";

const Image = require('./image');

module.exports = class ImageJpg extends Image {
  constructor(path) {
    if (!path.match(/\.jpe?g$/)) {
      throw new Error(`${path} is not a JPEG image`);
    }
    super(path);
  }
};
