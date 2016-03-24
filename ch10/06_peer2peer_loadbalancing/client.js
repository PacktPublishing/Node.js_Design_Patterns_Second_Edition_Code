var request = require('./balancedRequest');
for(var i = 10; i >= 0; i--) {
  request({method: 'GET', path: '/'}, function(res) {
    var str = '';
    res.on('data', function (chunk) {
      str += chunk;
    }).on('end', function () {
      console.log(str);
    });
  }).end();
}
