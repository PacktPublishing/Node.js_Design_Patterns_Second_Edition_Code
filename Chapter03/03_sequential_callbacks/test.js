"use strict";

function asyncOperation(callback) {
  process.nextTick(callback);
}

function task1(callback) {
  asyncOperation(() => {
    task2(callback);
  });
}

function task2(callback) {
  asyncOperation(() => {
    task3(callback);
  });
}

function task3(callback) {
  asyncOperation(() => {
    callback(); //finally executes the callback
  });
}

task1(() => {
  //executed when task1, task2 and task3 are completed
  console.log('tasks 1, 2 and 3 executed');
});
