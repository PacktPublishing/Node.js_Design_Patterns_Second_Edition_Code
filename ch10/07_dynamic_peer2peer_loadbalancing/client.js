var apiRequest = require('./apiRequest');
for(var i = 10; i >= 0; i--) {
  apiRequest('/api', function(err, res, body) {
    if(err) {
      return console.log(err);
    }
    console.log('Response: ' + body);
  });
}
