"use strict";

const apiRequest = require('./apiRequest');

for (let i = 10; i >= 0; i--) {
  apiRequest('/api', (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    console.log(`Response: ${body}`);
  });
}
