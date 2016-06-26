"use strict";

const path = require('path');
const webpack = require('webpack');

const definePlugin = new webpack.DefinePlugin({
  "__BROWSER__": "true"
});

const uglify = new webpack.optimize.UglifyJsPlugin({
  beautify: true,
  dead_code: true
});

module.exports = {
  entry:  path.join(__dirname, "src", "main.js"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  plugins: [definePlugin, uglify]
};
