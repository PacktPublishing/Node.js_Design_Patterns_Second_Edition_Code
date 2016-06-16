"use strict";

const fs = require('fs');
const split = require('split');
const request = require('request');
const throughParallel = require('through2-parallel');

fs.createReadStream(process.argv[2])
  .pipe(split())
  .pipe(throughParallel.obj({concurrency: 2}, function (url, enc, done) {
    if(!url) return done();
    request.head(url, (err, response) => {
      this.push(url + ' is ' + (err ? 'down' : 'up') + '\n');
      done();
    });
  }))
  .pipe(fs.createWriteStream('results.txt'))
  .on('finish', () => console.log('All urls were checked'))
;
