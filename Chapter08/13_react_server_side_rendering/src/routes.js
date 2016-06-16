"use strict";

const React = require('react');
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const hashHistory = ReactRouter.hashHistory;
const routesConfig = require('./routesConfig');

class Routes extends React.Component {
  render() {
    return <Router history={hashHistory} routes={routesConfig}/>;
  }
}

module.exports = Routes;