var sublevel = require('level-sublevel');
var level = require('level');
var bcrypt = require('bcrypt');
var uuid = require('node-uuid');
var async = require('async');

var db = sublevel(level('example-db', {valueEncoding: 'json'}));
var usersDb = db.sublevel('users');

var users = [
  {username: 'alice', password: 'secret'},
  {username: 'bob', password: 'secret'},
  {username: 'trudy', password: 'secret'}
]

async.forEach(users, function(user, callback) {
  usersDb.put(user.username, {
    hash: bcrypt.hashSync(user.password, 8)
  }, callback);
}, function(err) {
  if(err) {
    return console.log(err);
  }
  console.log('DB populated');
});

