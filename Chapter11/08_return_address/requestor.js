"use strict";

const req = require('./amqpRequest')();

req.initialize().then(() => {
  for (let i = 100; i > 0; i--) {
    sendRandomRequest();
  }
});

function sendRandomRequest() {
  const a = Math.round(Math.random() * 100);
  const b = Math.round(Math.random() * 100);
  req.request('requests_queue', {a: a, b: b}, 
    res => {
      console.log(`${a} + ${b} = ${res.sum}`);
    }
  );
}
