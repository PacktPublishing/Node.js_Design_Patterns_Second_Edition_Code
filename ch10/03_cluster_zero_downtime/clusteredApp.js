"use strict";

const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  let cpus = os.cpus().length;
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker, code) => {
    if (code != 0 && !worker.suicide) {
      console.log('Worker crashed. Starting a new worker');
      cluster.fork();
    }
  });
  
  process.on('SIGUSR2', () => {
    console.log('Restarting workers');
    let workers = Object.keys(cluster.workers);
    
    function restartWorker(i) {
      if (i >= workers.length) return;
      let worker = cluster.workers[workers[i]];
      console.log(`Stopping worker: ${worker.process.pid}`);
      worker.disconnect();
      
      worker.on('exit', () => {
        if (!worker.suicide) return;
        let newWorker = cluster.fork();
        newWorker.on('listening', () => {
          restartWorker(i + 1);
        });
      });
    }
    restartWorker(0);
  });
} else {
  require('./app');
}
