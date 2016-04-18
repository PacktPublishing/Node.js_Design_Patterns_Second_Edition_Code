"use strict";

module.exports = () => {
  let dependencies = {};
  let factories = {};
  let serviceLocator = {};
  
  serviceLocator.factory = (name, factory) => {
    factories[name] = factory;
  };
  
  serviceLocator.register = (name, instance) => {
    dependencies[name] = instance;
  };
  
  serviceLocator.get = (name) => {
    if (!dependencies[name]) {
      let factory = factories[name];
      dependencies[name] = factory && factory(serviceLocator);
      if (!dependencies[name]) {
        throw new Error('Cannot find module: ' + name);
      }
    }
    return dependencies[name];
  };

  return serviceLocator;
};
