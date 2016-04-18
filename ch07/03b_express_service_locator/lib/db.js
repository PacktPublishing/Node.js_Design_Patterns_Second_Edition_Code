var level = require('level');
var sublevel = require('level-sublevel');

module.exports = function(serviceLocator) {
  var dbName = serviceLocator.get('dbName');

  return sublevel(
    level(dbName, {valueEncoding: 'json'})
  );
}
