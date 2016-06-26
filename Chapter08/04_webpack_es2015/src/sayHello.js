"use strict";

const mustache = require('mustache');
const template = '<h1>Hello <i>{{name}}</i></h1>';
mustache.parse(template);
module.exports.sayHello = toWhom => {
  return mustache.render(template, {name: toWhom});
};
