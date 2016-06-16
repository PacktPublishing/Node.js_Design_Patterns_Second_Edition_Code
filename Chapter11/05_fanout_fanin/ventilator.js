"use strict";

const zmq = require('zmq');
const variationsStream = require('variations-stream');
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const batchSize = 10000;
const maxLength = process.argv[2];
const searchHash = process.argv[3];

const ventilator = zmq.socket('push');  // [1]
ventilator.bindSync("tcp://*:5016");

let batch = [];
variationsStream(alphabet, maxLength)
  .on('data', combination => {
    batch.push(combination);
    if (batch.length === batchSize) {  // [2]
      const msg = {searchHash: searchHash, variations: batch};
      ventilator.send(JSON.stringify(msg));
      batch = [];
    }
  })
  .on('end', () => {
    //send remaining combinations
    const msg = {searchHash: searchHash, variations: batch};
    ventilator.send(JSON.stringify(msg));
  })
;
