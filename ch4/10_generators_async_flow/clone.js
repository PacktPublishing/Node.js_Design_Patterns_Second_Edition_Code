"use strict";

function asyncFlow(generatorFunction) {
  function callback(err) {
    if (err) { 
      return generator.throw(err); 
    }
    let results = [].slice.call(arguments, 1);
    generator.next(results.length > 1 ? results : results[0]); 
  }
  let generator = generatorFunction(callback);
  generator.next(); 
}

const fs = require('fs');
const path = require('path');

asyncFlow(function* (callback) {
  let fileName = path.basename(__filename);
  let myself = yield fs.readFile(fileName, 'utf8', callback);
  yield fs.writeFile('clone_of_' + fileName, myself, callback);
  console.log('Clone created');
});
