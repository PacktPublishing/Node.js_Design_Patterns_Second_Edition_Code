"use strict";

const reply = require('./reply')(process);

reply((req, cb) => {
  setTimeout(() => {
    cb({sum: req.a + req.b});
  }, req.delay);
});
