"use strict";

module.exports = () => {
  const dependencies = {};
  const factories = {};
  const serviceLocator = {};
  
  serviceLocator.factory = (name, factory) => {
    factories[name] = factory;
  };
  
  serviceLocator.register = (name, instance) => {
    dependencies[name] = instance;
  };
  
  serviceLocator.get = (name) => {
    if (!dependencies[name]) {
      const factory = factories[name];
      dependencies[name] = factory && factory(serviceLocator);
      if (!dependencies[name]) {
        throw new Error('Cannot find module: ' + name);
      }
    }
    return dependencies[name];
  };

  return serviceLocator;
};
