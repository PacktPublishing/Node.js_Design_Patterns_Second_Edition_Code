"use strict";

const asyncModule = module.exports;

asyncModule.initialized = false;
asyncModule.initialize = callback => {
  setTimeout(() => {
    asyncModule.initialized = true;
    callback();
  }, 10000);
};

asyncModule.tellMeSomething = callback => {
  process.nextTick(() => {
    if(!asyncModule.initialized) {
      return callback(
        new Error('I don\'t have anything to say right now')
      );
    }
    callback(null, 'Current time is: ' + new Date());
  });
};
