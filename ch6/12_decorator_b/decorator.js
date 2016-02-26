"use strict";

function decorate(component) {
  // attaches a new method to the object
  component.greetings = function() {
    return 'Hey!';
  };
  
  return component;
}

class Greeter {
  hello(subject) {
    return `Hello ${subject}`;
  }
}

let decoratedGreeter = decorate(new Greeter());
console.log(decoratedGreeter.hello('world')); // uses original method
console.log(decoratedGreeter.greetings()); // uses new method
