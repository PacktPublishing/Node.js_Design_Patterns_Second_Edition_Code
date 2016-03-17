"use strict";

const fs = require('fs');

fs.writeFile('file.txt', 'Hello!', () => {
  fs.readFile('file.txt', {encoding: 'utf8'}, (err, res) => {
    console.log(res);
  });
});

//try to read a missing file
fs.readFile('missing.txt', {encoding: 'utf8'}, (err, res) => {
  console.log(err);
});
