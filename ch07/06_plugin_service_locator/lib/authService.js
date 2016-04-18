var jwt = require('jwt-simple');
var bcrypt = require('bcrypt');

module.exports = function(serviceLocator) {
  var db = serviceLocator.get('db');
  var tokenSecret = serviceLocator.get('tokenSecret');
  
  var users = db.sublevel('users');
  var authService = {};
  
  authService.login = function(username, password, callback) {
    users.get(username, function(err, user) {
      if(err) return callback(err);
      
      bcrypt.compare(password, user.hash, function(err, res) {
        if(err) return callback(err);
        if(!res) return callback(new Error('Invalid password'));
        
        var token = jwt.encode({
          username: username,
          expire: Date.now() + (1000 * 60 * 60) //1 hour
        }, tokenSecret);
        
        callback(null, token);
      });
    });
  };

  authService.checkToken = function(token, callback) {
    try {
      //jwt.decode will throw if the token is invalid
      var userData = jwt.decode(token, tokenSecret);
      if(userData.expire <= Date.now()) {
        throw new Error('Token expired');
      }
    } catch(err) {
      return process.nextTick(callback.bind(null, err));
    }
      
    users.get(userData.username, function(err, user) {
      if(err) return callback(err);
      callback(null, {username: userData.username});
    });
  };
  
  return authService;
};


