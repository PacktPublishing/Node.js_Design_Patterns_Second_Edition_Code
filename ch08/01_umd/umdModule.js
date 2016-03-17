"use strict";

(function(root, factory) {           //[1]
  if(typeof define === 'function' && define.amd) {   //[2]
    define(['mustache'], factory);
  } else if(typeof module === 'object' &&       //[3]
    typeof module.exports === 'object') {
    var mustache = require('mustache');
    module.exports = factory(mustache);
  } else {                 //[4]
    root.UmdModule = factory(root.Mustache);
  }
}(this, function(mustache) {           //[5]
  var template = '<h1>Hello <i>{{name}}</i></h1>';
  mustache.parse(template);

  return {
    sayHello:function(toWhom) {
      return mustache.render(template, {name: toWhom});
    }
  };
}));
