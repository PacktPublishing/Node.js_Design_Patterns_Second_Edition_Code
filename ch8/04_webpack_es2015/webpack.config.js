"use strict";

const path = require('path');

module.exports = {
  entry:  path.join(__dirname, "main.js"),
  output: {
    path: __dirname,
    filename: "bundle.js"
  }
}
