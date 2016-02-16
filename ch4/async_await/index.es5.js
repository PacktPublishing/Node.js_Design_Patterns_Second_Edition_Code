"use strict";

var bable = require('babel');
var request = require('request');

function getQuote() {
  var quote;

  return new Promise(function (resolve, reject) {
    request('http://ron-swanson-quotes.herokuapp.com/quotes', function (error, response, body) {
      quote = body;

      resolve(quote);
    });
  });
}

function main() {
  var quote;
  return regeneratorRuntime.async(function main$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return regeneratorRuntime.awrap(getQuote());

      case 2:
        quote = context$1$0.sent;

        console.log(quote);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

main();
console.log('Ron once said,');
