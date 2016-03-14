"use strict";

const React = require('react');
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const hashHistory = ReactRouter.hashHistory;
const AuthorsIndex = require('./components/authorsIndex');
const AuthorPage = require('./components/authorPage');
const NotFound = require('./components/notFound');

const routesConfig = [
  {path: '/', component: AuthorsIndex},
  {path: '/author/:id', component: AuthorPage},
  {path: '*', component: NotFound}
];

class Routes extends React.Component {
  render() {
    return <Router history={hashHistory} routes={routesConfig}/>;
  }
}

module.exports = Routes;