"use strict";

const path = require('path');
const utilities = require('./utilities');
const thunkify = require('thunkify');
const co = require('co');
const request = thunkify(require('request'));
const fs = require('fs');
const mkdirp = thunkify(require('mkdirp'));
const readFile = thunkify(fs.readFile);
const writeFile = thunkify(fs.writeFile);
const nextTick = thunkify(process.nextTick);

function* spiderLinks(currentUrl, body, nesting) {
  if(nesting === 0) {
    return nextTick();
  }
  
  const links = utilities.getPageLinks(currentUrl, body);
  const tasks = links.map(link => spider(link, nesting - 1));
  yield tasks;
}

function* download(url, filename) {
  console.log(`Downloading ${url}`);
  const results = yield request(url);
  const body = results[1];
  yield mkdirp(path.dirname(filename));
  yield writeFile(filename, body);
  console.log(`Downloaded and saved: ${url}`);
  return body;
}

const spidering = new Map();
function* spider(url, nesting) {
  if(spidering.has(url)) {
    return nextTick();
  }
  spidering.set(url, true);
  
  let filename = utilities.urlToFilename(url);
  let body;
  try {
    body = yield readFile(filename, 'utf8');
  } catch(err) {
    if(err.code !== 'ENOENT') {
      throw err;
    }
    body = yield download(url, filename);
  }
  yield spiderLinks(url, body, nesting);
}

co(function* () {
  try {
    yield spider(process.argv[2], 1);
    console.log('Download complete');
  } catch(err) {
    console.log(err);
  }
});
