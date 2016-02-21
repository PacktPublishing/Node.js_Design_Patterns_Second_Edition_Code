"use strict";

const stream = require('stream');
const Chance = require('chance');

let chance = new Chance();

class RandomStream extends stream.Readable {
  constructor(options) {
    super(options);
  }

  _read(size) {
    let chunk = chance.string();          //[1]
    console.log(`Pushing chunk of size: ${chunk.length}`);
    this.push(chunk, 'utf8');             //[2]
    if(chance.bool({likelihood: 5})) {    //[3]
      this.push(null);
    }
  }
}

module.exports = RandomStream;