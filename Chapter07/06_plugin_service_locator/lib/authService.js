"use strict";

const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');

module.exports = (serviceLocator) => {
  const db = serviceLocator.get('db');
  const tokenSecret = serviceLocator.get('tokenSecret');
  
  const users = db.sublevel('users');
  const authService = {};
  
  authService.login = (username, password, callback) => {
    users.get(username, (err, user) => {
      if (err) return callback(err);
      
      bcrypt.compare(password, user.hash, (err, res) => {
        if (err) return callback(err);
        if (!res) return callback(new Error('Invalid password'));
        
        const token = jwt.encode({
          username: username,
          expire: Date.now() + (1000 * 60 * 60) //1 hour
        }, tokenSecret);
        
        callback(null, token);
      });
    });
  };

  authService.checkToken = (token, callback) => {
    let userData;

    try {
      //jwt.decode will throw if the token is invalid
      userData = jwt.decode(token, tokenSecret);
      if (userData.expire <= Date.now()) {
        throw new Error('Token expired');
      }
    } catch(err) {
      return process.nextTick(callback.bind(null, err));
    }
      
    users.get(userData.username, (err, user) => {
      if (err) return callback(err);
      callback(null, {username: userData.username});
    });
  };
  
  return authService;
};
