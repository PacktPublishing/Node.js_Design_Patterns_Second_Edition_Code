"use strict";

function Logger(name) {
  this.name = name;
}

Logger.prototype.log = function(message) {
  console.log(`[${this.name}] ${message}`);
};

Logger.prototype.info = function(message) {
  this.log(`info: ${message}`);
};

Logger.prototype.verbose = function(message) {
  this.log(`verbose: ${message}`);
};

module.exports = Logger;
