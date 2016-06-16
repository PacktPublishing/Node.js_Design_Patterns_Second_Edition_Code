"use strict";

const request = require('./balancedRequest');

for (let i = 10; i >= 0; i--) {
  request({method: 'GET', path: '/'}, res => {
    let str = '';
    res
      .on('data', chunk => {
        str += chunk;
      })
      .on('end', () => console.log(str))
    ;
  }).end();
}
