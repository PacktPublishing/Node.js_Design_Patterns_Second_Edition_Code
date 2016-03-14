"use strict";

const React = require('react');
const Link = require('react-router').Link;

class NotFound extends React.Component {
  render() {
    return (
      <div>
        <h2>Page not found</h2>
        <Link to="/">Go back to index</Link>
      </div>
    );
  }
}

module.exports = NotFound;
