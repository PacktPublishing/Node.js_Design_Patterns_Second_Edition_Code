"use strict";

const createFailsafeSocket = require('./failsafeSocket');

const failsafeSocket = createFailsafeSocket({port: 5000});

setInterval(() => {
  //send current memory usage
  failsafeSocket.send(process.memoryUsage());
}, 1000);
