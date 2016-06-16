"use strict";

module.exports = class TaskQueue {
  constructor (concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  pushTask (task) {
    this.queue.push(task);
    this.next();
  }

  next() {
    while (this.running < this.concurrency && this.queue.length) {
      const task = this.queue.shift();
      task (() => {
        this.running--;
        this.next();
      });
      this.running++;
    }
  }
};
