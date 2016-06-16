"use strict";

const amqp = require('amqplib');
const variationsStream = require('variations-stream');
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const batchSize = 10000;
const maxLength = process.argv[2];
const searchHash = process.argv[3];

let connection, channel;
amqp
  .connect('amqp://localhost')
  .then(conn => {
    connection = conn;
    return conn.createChannel();
  })
  .then(ch => {
    channel = ch;
    produce();
  })
  .catch(err => console.log(err))
;

function produce() {
  let batch = [];
  variationsStream(alphabet, maxLength)
    .on('data', combination => {
      batch.push(combination);
      if (batch.length === batchSize) {
        const msg = {searchHash: searchHash, variations: batch};
        channel.sendToQueue('jobs_queue', 
          new Buffer(JSON.stringify(msg)));
        batch = [];
      }
    })
    .on('end', () => {
      //send remaining combinations
      const msg = {searchHash: searchHash, variations: batch};
      channel.sendToQueue(
          'jobs_queue', 
          new Buffer(JSON.stringify(msg)), 
          //when the last message is sent, close the connection
          //to allow the application to exit
          function() {
            channel.close();
            connection.close();
          }
      );
    })
  ;
}
