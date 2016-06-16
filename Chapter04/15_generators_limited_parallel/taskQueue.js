"use strict";

const co = require('co');

class TaskQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.taskQueue = [];
    this.consumerQueue = [];
    this.spawnWorkers(concurrency);
  }

  pushTask(task) {
    if (this.consumerQueue.length !== 0) {
      this.consumerQueue.shift()(null, task);
    } else {
      this.taskQueue.push(task);
    }
  }

  spawnWorkers(concurrency) {
    const self = this;
    for(let i = 0; i < concurrency; i++) {
      co(function* () {
        while(true) {
          const task = yield self.nextTask();
          yield task;
        }
      });
    }
  }

  nextTask() {
    return callback => {
      if(this.taskQueue.length !== 0) {
        return callback(null, this.taskQueue.shift());
      }

      this.consumerQueue.push(callback);
    }
  }
}

module.exports = TaskQueue;
