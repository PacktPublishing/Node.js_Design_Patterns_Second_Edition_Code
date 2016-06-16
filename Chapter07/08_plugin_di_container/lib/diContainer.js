"use strict";

const fnArgs = require('parse-fn-args');

module.exports = function() {
  const dependencies = {};
  const factories = {};
  const diContainer = {};
  
  diContainer.factory = (name, factory) => {
    factories[name] = factory;
  };
  
  diContainer.register = (name, dep) => {
    dependencies[name] = dep;
  };
  
  diContainer.get = (name) => {
    if(!dependencies[name]) {
      const factory = factories[name];
      dependencies[name] = factory && 
          diContainer.inject(factory);
      if (!dependencies[name]) {
        throw new Error('Cannot find module: ' + name);
      }
    }
    return dependencies[name];
  };
  
  diContainer.inject = (factory) => {
    const args = fnArgs(factory)
      .map(function(dependency) {
        return diContainer.get(dependency);
      });
    return factory.apply(null, args);
  };
  
  return diContainer;
};
