

var authController = {};

authController.login = function (req, res, next) {
  //Dependency retrieved from the express app
  //which acts as service locator
  var authService = req.app.get('authService');
  
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
  //Dependency retrieved from the express app
  //which acts as service locator
  var authService = req.app.get('authService');
  
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

module.exports = authController;
