"use strict";

const replier = require('child_process')
                .fork(`${__dirname}/replier.js`);
const request = require('./request')(replier);

request({a: 1, b: 2, delay: 500}, res => {
  console.log('1 + 2 = ', res.sum);
  //this should be the last reply we receive, so we close the channel
  replier.disconnect();
});

request({a: 6, b: 1, delay: 100}, res => {
  console.log('6 + 1 = ', res.sum);
});
