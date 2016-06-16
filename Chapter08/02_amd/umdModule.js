(function(root, factory) {
  if(typeof define === 'function' && define.amd) {
    define(['mustache'], factory);
  } else if(typeof module === 'object' && 
      typeof module.exports === 'object') {
    var mustache = require('mustache');
    module.exports = factory(mustache);
  } else {
    root.UmdModule = factory(root.Mustache);
  }
}(this, function(mustache) {
  var template = '<h1>Hello <i>{{name}}</i></h1>';
  mustache.parse(template);
  
  return {
    sayHello:function(toWhom) {
      return mustache.render(template, {name: toWhom});
    }
  };
}));
