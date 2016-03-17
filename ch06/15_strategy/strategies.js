"use strict";

const ini = require('ini');

module.exports.json = {
  deserialize: data => JSON.parse(data),
  serialize: data => JSON.stringify(data, null, '  ')
};

module.exports.ini = {
  deserialize: data => ini.parse(data),
  serialize: data => ini.stringify(data)
};
