var authService = require('./authService');

exports.login = function (req, res, next) {
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


exports.checkToken = function (req, res, next) {
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
