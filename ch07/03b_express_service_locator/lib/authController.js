"use strict";

const authController = {};

authController.login = (req, res, next) => {
  //Dependency retrieved from the express app
  //which acts as service locator
  const authService = req.app.get('authService');
  
  authService.login(req.body.username, req.body.password,
    (err, result) => {
      if(err) {
        return res.status(401).send({
          ok: false,
          error: 'Invalid username/password'
        });
      }
      res.status(200).send({ok: true, token: result});
    }
  );
};

authController.checkToken = (req, res, next) => {
  //Dependency retrieved from the express app
  //which acts as service locator
  const authService = req.app.get('authService');
  
  authService.checkToken(req.query.token,
    (err, result) => {
      if(err) {
        return res.status(401).send({
          ok: false,
          error: 'Token is invalid or expired'  
        });
      }
      res.status(200).send({ok: 'true', user: result});
    }
  );
};

module.exports = authController;
