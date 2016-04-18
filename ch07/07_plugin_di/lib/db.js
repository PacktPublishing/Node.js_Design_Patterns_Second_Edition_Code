var level = require('level');
var sublevel = require('level-sublevel');

module.exports = function(dbName) {
  return sublevel(
    level(dbName, {valueEncoding: 'json'})
  );
};
