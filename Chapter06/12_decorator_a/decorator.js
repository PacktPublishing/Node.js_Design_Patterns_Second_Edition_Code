"use strict";

function decorate(component) {
  const proto = Object.getPrototypeOf(component);
  
  function Decorator(component) {
    this.component = component;
  }
  
  Decorator.prototype = Object.create(proto);
  
  //new method
  Decorator.prototype.greetings = function() {
    return 'Hi!';
  };
  
  //delegated method
  Decorator.prototype.hello = function() {
    return this.component.hello.apply(this.component, arguments); 
  };
  
  return new Decorator(component);
}

class Greeter {
  hello(subject) {
    return `Hello ${subject}`;
  }
}

const decoratedGreeter = decorate(new Greeter());
console.log(decoratedGreeter.hello('world')); // uses original method
console.log(decoratedGreeter.greetings()); // uses new method
