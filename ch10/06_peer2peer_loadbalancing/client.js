"use strict";

const request = require('./balancedRequest');

for (let i = 10; i >= 0; i--) {
  request({method: 'GET', path: '/'}, res => {
    var str = '';
    res
      .on('data', chunk => {
        str += chunk;
      })
      .on('end', () => console.log(str))
    ;
  }).end();
}
