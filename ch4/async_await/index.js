"use strict";

const request = require('request');

function getPageHtml(url) {
  let quote;

  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      resolve(body);
    });
  });
}

async function main() {
  let html = await getPageHtml('http://google.com');
  console.log(html);
}

main();
console.log('Loading...');
