"use strict";

const zmq = require('zmq');
const crypto = require('crypto');
const fromVentilator = zmq.socket('pull');
const toSink = zmq.socket('push');

fromVentilator.connect('tcp://localhost:5016');
toSink.connect('tcp://localhost:5017');

fromVentilator.on('message', buffer => {
  let msg = JSON.parse(buffer);
  let variations = msg.variations;
  variations.forEach( word => {
    console.log(`Processing: ${word}`);
    let shasum = crypto.createHash('sha1');
    shasum.update(word);
    let digest = shasum.digest('hex');
    if (digest === msg.searchHash) {
      console.log(`Found! => ${word}`);
      toSink.send(`Found! ${digest} => ${word}`);
    }
  });
});
