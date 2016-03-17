"use strict";

const RandomStream = require('./randomStream');
let randomStream = new RandomStream();

randomStream.on('readable', () => {
  var chunk;
  while((chunk = randomStream.read()) !== null) {
    console.log(`Chunk received: ${chunk.toString()}`);
  }
});
