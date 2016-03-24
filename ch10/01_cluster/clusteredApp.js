var cluster = require('cluster');
var os = require('os');

if(cluster.isMaster) {
  var cpus = os.cpus().length;
  for (var i = 0; i < cpus; i++) {
    cluster.fork();
  }
} else {
  require('./app');
}
