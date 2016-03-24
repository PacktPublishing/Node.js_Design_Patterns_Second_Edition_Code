var http = require('http');
var pid = process.pid;
var seaport = require('seaport').connect('localhost', 9090);
var serviceType = process.argv[2];
var port = seaport.register(serviceType);

http.createServer(function(req, res) {
  for(var i = 1e7; i > 0; i--) {}
  console.log('Handling request from ' + pid);
  res.end(serviceType + ' response from ' + pid + '\n');
}).listen(port, function() {
  console.log('Started ' + pid + ' on port ' + port);
});
