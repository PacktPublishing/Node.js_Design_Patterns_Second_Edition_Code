"use strict";

function decorate(component) {
  let proto = Object.getPrototypeOf(component);
  
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

let decoratedGreeter = decorate(new Greeter());
console.log(decoratedGreeter.hello('world')); // uses original method
console.log(decoratedGreeter.greetings()); // uses new method
