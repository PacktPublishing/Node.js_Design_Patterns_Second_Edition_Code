"use strict";

module.exports = (authService) => {
  const authController = {};
  
  authController.login = (req, res, next) => {
    authService.login(req.body.username, req.body.password,
      (err, result) => {
        if (err) {
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
    authService.checkToken(req.query.token,
      (err, result) => {
        if (err) {
          return res.status(401).send({
            ok: false,
            error: 'Token is invalid or expired'  
          });
        }
        res.status(200).send({ok: 'true', user: result});
      }
    );
  };
  
  return authController;
};
