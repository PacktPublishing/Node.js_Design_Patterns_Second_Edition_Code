"use strict";

const fs = require('fs'); 
const zlib = require('zlib'); 
const http = require('http'); 
const path = require('path'); 

let file = process.argv[2]; 
let server = process.argv[3]; 
 
let options = { 
  hostname: server, 
  port: 3000, 
  path: '/', 
  method: 'PUT',  
  headers: { 
    filename: path.basename(file), 
    'Content-Type': 'application/octet-stream', 
    'Content-Encoding': 'gzip' 
  } 
}; 
 
let req = http.request(options, res => { 
  console.log('Server response: ' + res.statusCode); 
}); 
 
fs.createReadStream(file) 
  .pipe(zlib.createGzip())
  
  .pipe(req) 
  .on('finish', () => { 
    console.log('File successfully sent'); 
  })
;
