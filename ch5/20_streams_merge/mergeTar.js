"use strict";

const tar = require('tar');
const fstream = require('fstream');
const path = require('path');

let destination = path.resolve(process.argv[2]);
let sourceA = path.resolve(process.argv[3]);
let sourceB = path.resolve(process.argv[4]);

let pack = tar.Pack();
pack.pipe(fstream.Writer(destination));

let endCount = 0;
function onEnd() {
  if(++endCount === 2) {
    pack.end();
  }
}

let sourceStreamA = fstream.Reader({type: "Directory", path: sourceA})
  .on('end', onEnd)
;

let sourceStreamB = fstream.Reader({type: "Directory", path: sourceB})
  .on('end', onEnd)
;
