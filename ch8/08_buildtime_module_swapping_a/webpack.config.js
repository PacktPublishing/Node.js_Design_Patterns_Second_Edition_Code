"use strict";

const path = require('path');
const webpack = require('webpack');

let moduleReplacementPlugin =
  new webpack.NormalModuleReplacementPlugin(/alertServer.js$/, './alertBrowser.js');

module.exports = {
  entry:  path.join(__dirname, "src", "main.js"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  plugins: [moduleReplacementPlugin]
};
