"use strict";

let mod = (() => {
  let privateFoo = () => {};
  let privateVar = [];

  let exported = {
    publicFoo: () => {},
    publicBar: () => {}
  };

  return exported;
})();

console.log(mod);
