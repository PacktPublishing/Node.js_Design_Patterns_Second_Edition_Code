"use strict";

let mod = (() => {
  let privateFoo = () => {};
  let privateBar = [];

  let exported = {
    publicFoo: () => {},
    publicBar: () => {}
  };

  return exported;
})();

console.log(mod);
