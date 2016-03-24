var request = require('request');
var seaport = require('seaport').connect('localhost', 9090);
var i = 0;
var queue = [];

//Seaport retrieves the server list asyncronously
//So we implement a pre-initialization queue pattern
//to not loose any client connection
seaport.on('synced', function() {
  queue.forEach(function(args) {
    module.exports.apply(null, args);
  });
});

module.exports = function(path, callback) {
  var servers = seaport.query('api-service');
  if(!servers.length) {
    return queue.push([path, callback]);
  }
  i = (i + 1) % servers.length;
  var url = 'http://' + servers[i].host + ':' + 
    servers[i].port + path;
  request(url, callback);
}
