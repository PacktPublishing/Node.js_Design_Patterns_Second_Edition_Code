"use strict";

class Person {
  constructor (name, surname, age) {
    this.name = name;
    this.surname = surname;
    this.age = age;
  }

  getFullName () {
    return this.name + ' ' + this.surname;
  }

  static older (person1, person2) {
    return (person1.age >= person2.age) ? person1 : person2;
  }
}

const luciano = new Person('Luciano', 'Mammino', 29);
console.log(luciano.getFullName());
const alan = new Person('Alan', 'Turing', 104);
console.log(Person.older(luciano, alan));
