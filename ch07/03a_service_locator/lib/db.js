"use strict";

const level = require('level');
const sublevel = require('level-sublevel');

module.exports = (serviceLocator) => {
  let dbName = serviceLocator.get('dbName');

  return sublevel(
    level(dbName, {valueEncoding: 'json'})
  );
}
