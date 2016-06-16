"use strict";

const path = require('path');

module.exports = function createFsAdapter(db) {
  const fs = {};

  fs.readFile = (filename, options, callback) => {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    } else if(typeof options === 'string') {
      options = {encoding: options};
    }

    db.get(path.resolve(filename), {         //[1]
        valueEncoding: options.encoding
      },
      (err, value) => {
        if(err) {
          if(err.type === 'NotFoundError') {       //[2]
            err = new Error(`ENOENT, open "${filename}"`);
            err.code = 'ENOENT';
            err.errno = 34;
            err.path = filename;
          }
          return callback && callback(err);
        }
        callback && callback(null, value);       //[3]
      }
    );
  };

  fs.writeFile = (filename, contents, options, callback) => {
    if(typeof options === 'function') {
      callback = options;
      options = {};
    } else if(typeof options === 'string') {
      options = {encoding: options};
    }

    db.put(path.resolve(filename), contents, {
      valueEncoding: options.encoding
    }, callback);
  };

  return fs;
};
