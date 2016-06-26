"use strict";

const React = require('react');
const AsyncProps = require('async-props').default;
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const browserHistory = ReactRouter.browserHistory;
const routesConfig = require('./routesConfig');

class Routes extends React.Component {
  render() {
    return <Router
      history={browserHistory}
      routes={routesConfig}
      render={(props) => <AsyncProps {...props}/>}
    />;
  }
}

module.exports = Routes;
