"use strict";

const http = require('http');
const Express = require('express');
var favicon = require('serve-favicon');
const httpProxy = require('http-proxy');
const React = require('react');
const AsyncProps = require('async-props').default;
const loadPropsOnServer = require('async-props').loadPropsOnServer;
const ReactDom = require('react-dom/server');
const Router = require('react-router');
const routesConfig = require('./src/routesConfig');

const app = new Express();
const server = new http.Server(app);

let targetUrl = 'http://localhost:3001';
const proxy = httpProxy.createProxyServer({
  target: targetUrl
});

app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/dist/favicon.ico'));
app.use('/dist', Express.static('dist'));
app.use('/api', (req, res) => {
  proxy.web(req, res, {target: targetUrl});
});

app.get('*', (req, res) => {
  Router.match({routes: routesConfig, location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      loadPropsOnServer(renderProps, {}, (err, asyncProps, scriptTag) => {
        let markup = ReactDom.renderToString(<AsyncProps {...renderProps} {...asyncProps} />);
        res.render('index', {markup, scriptTag});

      });
    } else {
      res.status(404).send('Not found')
    }
  });
});

server.listen(3000, (err) => {
  if (err) {
    console.error(err);
  }
  console.info('WebServer running on http://localhost:3000');
});