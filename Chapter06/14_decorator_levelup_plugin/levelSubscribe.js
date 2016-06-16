"use strict";

module.exports = function levelSubscribe(db) {
  db.subscribe = (pattern, listener) => {       //[1]
    db.on('put', (key, val) => {         //[2]
      const match = Object.keys(pattern).every(
        k => (pattern[k] === val[k])     //[3]
      );
      
      if(match) {
        listener(key, val);            //[4]
      }
    });
  };
  return db;
};
