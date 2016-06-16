"use strict";

const mod = (() => {
  const privateFoo = () => {};
  const privateBar = [];

  const exported = {
    publicFoo: () => {},
    publicBar: () => {}
  };

  return exported;
})();

console.log(mod);
