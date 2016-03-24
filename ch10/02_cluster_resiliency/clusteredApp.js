var cluster = require('cluster');
var os = require('os');

if(cluster.isMaster) {
  var cpus = os.cpus().length;
  for (var i = 0; i < cpus; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', function(worker, code) {
    if(code != 0) {
      console.log('Worker crashed. Starting a new worker');
      cluster.fork();
    }
  });
} else {
  require('./app');
}
