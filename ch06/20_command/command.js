"use strict";

const request = require('request');
const util = require('util');

//The target
let statusUpdateService = {
  statusUpdates: {},
  sendUpdate: function(status) {
    console.log('Status sent: ' + status);
    let id = Math.floor(Math.random() * 1000000);
    statusUpdateService.statusUpdates[id] = status;
    return id;
  },
  
  destroyUpdate: id => {
    console.log('Status removed: ' + id);
    delete statusUpdateService.statusUpdates[id];
  }
};

//The Command
function createSendStatusCmd(service, status) {
  let postId = null;
  
  let command = () => {
    postId = service.sendUpdate(status);
  };
  
  command.undo = () => {
    if(postId) {
      service.destroyUpdate(postId);
      postId = null;
    }
  };
  
  command.serialize = () => {
    return {type: 'status', action: 'post', status: status};
  };
  
  return command;
}

//The Invoker
class Invoker {
  constructor() {
    this.history = [];
  }

  run (cmd) {
    this.history.push(cmd);
    cmd();
    console.log('Command executed', cmd.serialize());
  }

  delay (cmd, delay) {
    setTimeout( () => {
      this.run(cmd);
    }, delay)
  }

  undo () {
    let cmd = this.history.pop();
    cmd.undo();
    console.log('Command undone', cmd.serialize());
  }

  runRemotely (cmd) {
    request.post('http://localhost:3000/cmd',
      {json: cmd.serialize()},
      err => {
        console.log('Command executed remotely', cmd.serialize());
      }
    );
  }
}

//The Client code
let invoker = new Invoker();
let command = createSendStatusCmd(statusUpdateService, 'HI!');
invoker.run(command);
invoker.delay(command, 1000 * 60 * 60);
invoker.undo();
invoker.runRemotely(command);
