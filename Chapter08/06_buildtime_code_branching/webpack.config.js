"use strict";

const path = require('path');
const webpack = require('webpack');

let definePlugin = new webpack.DefinePlugin({
  "__BROWSER__": "true"
});

let uglify = new webpack.optimize.UglifyJsPlugin({
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
