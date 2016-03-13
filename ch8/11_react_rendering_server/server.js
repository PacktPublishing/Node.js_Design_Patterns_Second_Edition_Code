"use strict";

const http = require('http');
const Express = require('express');
const React = require('react');
const ReactDom = require('react-dom/server');
const JoyceBooks = require('./joyceBooks');

const app = new Express();
const server = new http.Server(app);

app.set('view engine', 'ejs');

app.use('/', (req, res) => {
  let markup = ReactDom.renderToString(<JoyceBooks/>);
  res.render('index', {markup});
});

server.listen(3000, (err) => {
  if (err) {
    console.error(err);
  }
  console.info('Server running on http://localhost:3000');
});