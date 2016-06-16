"use strict";

const path = require('path');
const utilities = require('./utilities');
const request = utilities.promisify(require('request'));
const fs = require('fs');
const mkdirp = utilities.promisify(require('mkdirp'));
const readFile = utilities.promisify(fs.readFile);
const writeFile = utilities.promisify(fs.writeFile);

function spiderLinks(currentUrl, body, nesting) {
  if(nesting === 0) {
    return Promise.resolve();
  }
  
  const links = utilities.getPageLinks(currentUrl, body);
  const promises = links.map(link => spider(link, nesting - 1));
  
  return Promise.all(promises);
}

function download(url, filename) {
  console.log(`Downloading ${url}`);
  let body;
  return request(url)
    .then(response => {
      body = response.body;
      return mkdirp(path.dirname(filename));
    })
    .then(() => writeFile(filename, body))
    .then(() => {
      console.log(`Downloaded and saved: ${url}`);
      return body;
    })
  ;
}

const spidering = new Map();
function spider(url, nesting) {
  if(spidering.has(url)) {
    return Promise.resolve();
  }
  spidering.set(url, true);
  
  const filename = utilities.urlToFilename(url);
  return readFile(filename, 'utf8')
    .then(
      body => spiderLinks(url, body, nesting),
      err  => {
        if(err.code !== 'ENOENT') {
          throw err;
        }
        
        return download(url, filename)
          .then(body => spiderLinks(url, body, nesting))
        ;
      }
    );
}

spider(process.argv[2], 1)
  .then(() => console.log('Download complete'))
  .catch(err => console.log(err))
;
