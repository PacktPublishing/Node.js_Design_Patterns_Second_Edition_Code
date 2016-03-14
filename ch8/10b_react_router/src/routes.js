"use strict";

const React = require('react');
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const hashHistory = ReactRouter.hashHistory;
const AuthorsIndex = require('./components/authorsIndex');
const JoyceBooks = require('./components/joyceBooks');
const WellsBooks = require('./components/wellsBooks');
const NotFound = require('./components/notFound');

class Routes extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={AuthorsIndex}/>
        <Route path="/author/joyce" component={JoyceBooks}/>
        <Route path="/author/h-g-wells" component={WellsBooks}/>
        <Route path="*" component={NotFound} />
      </Router>
    )
  }
}

module.exports = Routes;