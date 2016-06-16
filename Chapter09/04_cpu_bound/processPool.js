"use strict";

const fork = require('child_process').fork;

class ProcessPool {
  constructor(file, poolMax) {
    this.file = file;
    this.poolMax = poolMax;
    this.pool = [];
    this.active = [];
    this.waiting = [];
  }

  acquire(callback) {
    let worker;
    if(this.pool.length > 0) {  // [1]
      worker = this.pool.pop();
      this.active.push(worker);
      return process.nextTick(callback.bind(null, null, worker));
    }

    if(this.active.length >= this.poolMax) {  // [2]
      return this.waiting.push(callback);
    }

    worker = fork(this.file);  // [3]
    this.active.push(worker);
    process.nextTick(callback.bind(null, null, worker));
  }

  release(worker) {
    if(this.waiting.length > 0) {  // [1]
      const waitingCallback = this.waiting.shift();
      waitingCallback(null, worker);
    }
    this.active = this.active.filter(w => worker !==  w);  // [2]
    this.pool.push(worker);
  }
}

module.exports = ProcessPool;
