"use strict";

const asyncModule = require('./asyncModule');

//The wrapper
const asyncModuleWrapper = module.exports;
asyncModuleWrapper.initialized = false;
asyncModuleWrapper.initialize = function() {
  activeState.initialize.apply(activeState, arguments);
};

asyncModuleWrapper.tellMeSomething = function() {
  activeState.tellMeSomething.apply(activeState, arguments);
};

//The state to use when the module is not yet initialized
let pending = [];
let notInitializedState = {

  initialize: function(callback) {
    asyncModule.initialize(function() {
      asyncModuleWrapper.initalized = true;
      activeState = initializedState;
      
      pending.forEach(function(req) {
        asyncModule[req.method].apply(null, req.args);
      });
      pending = [];
      
      callback();
    });
  },
  
  tellMeSomething: function(callback) {
    return pending.push({
      method: 'tellMeSomething',
      args: arguments
    });
  }
  
};

//The state to use when the module is initialized
let initializedState = asyncModule;


//Set the initial state to the notInitializedState
let activeState = notInitializedState;

