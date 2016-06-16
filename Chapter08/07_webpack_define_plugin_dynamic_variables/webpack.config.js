"use strict";

const path = require('path');
const webpack = require('webpack');
const os = require('os');

let definePlugin = new webpack.DefinePlugin({
  "__NOW__": JSON.stringify((new Date()).toString()),
  "__PLATFORM__": JSON.stringify(os.platform()),
  "__HOST__": JSON.stringify(os.hostname())
});

module.exports = {
  entry:  path.join(__dirname, "src", "main.js"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  plugins: [definePlugin]
};
