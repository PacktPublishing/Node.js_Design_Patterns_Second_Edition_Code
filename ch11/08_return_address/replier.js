"use strict";

const Reply = require('./amqpReply');
const reply = Reply('requests_queue');

reply.initialize().then(() => {
  reply.handleRequest((req, cb) => {
    console.log('Request received', req);
    cb({sum: req.a + req.b});
  });
});
