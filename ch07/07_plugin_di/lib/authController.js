
module.exports = function(authService) {
  var authController = {};
  
  authController.login = function (req, res, next) {
    authService.login(req.body.username, req.body.password,
      function(err, result) {
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

  authController.checkToken = function (req, res, next) {
    authService.checkToken(req.query.token,
      function(err, result) {
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
  
  return authController;
}
