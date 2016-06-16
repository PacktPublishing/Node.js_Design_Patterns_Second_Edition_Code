"use strict";

const request = require('request');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const utilities = require('./utilities');

function spider(url, callback) {
  const filename = utilities.urlToFilename(url);
  fs.exists(filename, exists => {        //[1]
    if(!exists) {
      console.log(`Downloading ${url}`);
      request(url, (err, response, body) => {      //[2]
        if(err) {
          callback(err);
        } else {
          mkdirp(path.dirname(filename), err => {    //[3]
            if(err) {
              callback(err);
            } else {
              fs.writeFile(filename, body, err => { //[4]
                if(err) {
                  callback(err);
                } else {
                  callback(null, filename, true);
                }
              });
            }
          });
        }
      });
    } else {
      callback(null, filename, false);
    }
  });
}

spider(process.argv[2], (err, filename, downloaded) => {
  if(err) {
    console.log(err);
  } else if(downloaded){
    console.log(`Completed the download of "${filename}"`);
  } else {
    console.log(`"${filename}" was already downloaded`);
  }
});
