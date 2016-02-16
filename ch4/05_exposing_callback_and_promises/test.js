"use strict";

var asyncDivision = require('./index.js');

// callback oriented usage
asyncDivision(10, 2, (error, result) => {
  if (error) {
    return console.error(error);
  }
  console.log(result);
});

// promise oriented usage
asyncDivision(22, 11)
  .then(result => console.log(result))
  .catch(error => console.error(error))
;
