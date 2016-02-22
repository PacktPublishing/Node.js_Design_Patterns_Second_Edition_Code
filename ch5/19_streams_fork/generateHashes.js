"use strict";

const fs = require('fs');
const crypto = require('crypto');

let sha1Stream = crypto.createHash('sha1');
sha1Stream.setEncoding('base64');

let md5Stream = crypto.createHash('md5');
md5Stream.setEncoding('base64');

let inputFile = process.argv[2];
let inputStream = fs.createReadStream(inputFile);
inputStream
  .pipe(sha1Stream)
  .pipe(fs.createWriteStream(inputFile + '.sha1'))
;
  
inputStream
  .pipe(md5Stream)
  .pipe(fs.createWriteStream(inputFile + '.md5'))
;
