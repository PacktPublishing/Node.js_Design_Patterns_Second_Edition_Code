"use strict";

const level = require('level');           //[1]
const levelSubscribe = require('./levelSubscribe');     //[2]

let db = level(__dirname + '/db', {valueEncoding: 'json'});

db = levelSubscribe(db);
db.subscribe(
  {doctype: 'tweet', language: 'en'},     //[3]
  (k, val) => console.log(val)
);

db.put('1', {doctype: 'tweet', text: 'Hi', language: 'en'}); //[4]
db.put('2', {doctype: 'company', name: 'ACME Co.'});
