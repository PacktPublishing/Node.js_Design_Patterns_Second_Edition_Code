"use strict";

const fs = require('fs');
const split = require('split');
const request = require('request');
const ParallelStream = require('./parallelStream');

fs.createReadStream(process.argv[2])         //[1]
  .pipe(split())                             //[2]
  .pipe(new ParallelStream((url, enc, done, push) => {     //[3]
    if(!url) return done();
    request.head(url, (err, response) => {
      push(url + ' is ' + (err ? 'down' : 'up') + '\n');
      done();
    });
  }))
  .pipe(fs.createWriteStream('results.txt'))   //[4]
  .on('finish', () => console.log('All urls were checked'))
;
