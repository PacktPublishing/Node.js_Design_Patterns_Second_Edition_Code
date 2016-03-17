"use strict";

const fromArray = require('from2-array');
const through = require('through2');
const fs = require('fs');

function concatFiles(destination, files, callback) {
  let destStream = fs.createWriteStream(destination);
  fromArray.obj(files)             //[1]
    .pipe(through.obj((file, enc, done) => {   //[2]
      let src = fs.createReadStream(file);
      src.pipe(destStream, {end: false});
      src.on('end', done); //[3]
    }))
    .on('finish', () => {         //[4]
      destStream.end();
      callback();
    });
}

module.exports = concatFiles;
