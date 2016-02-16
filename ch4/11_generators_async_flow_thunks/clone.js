"use strict";

function asyncFlowWithThunks(generatorFunction) {
  function callback(err) {
    if(err) { 
      return generator.throw(err); 
    }
    let results = [].slice.call(arguments, 1);
    let thunk = generator.next(results.length > 1 ? results : results[0]).value;
    thunk && thunk(callback);
  }
  let generator = generatorFunction();
  let thunk = generator.next().value;
  thunk && thunk(callback);
}

const fs = require('fs');
let readFileThunk = function(filename, options) {
  return (cb) => {
    fs.readFile(filename, options, cb);
  }
};

let writeFileThunk = function(filename, options) {
  return (cb) => {
    fs.writeFile(filename, options, cb);
  }
};

const path = require('path');

asyncFlowWithThunks(function* () {
  let fileName = path.basename(__filename);
  let myself = yield readFileThunk(fileName, 'utf8');
  yield writeFileThunk('clone_of_' + fileName, myself);
  console.log('Clone created');
});
