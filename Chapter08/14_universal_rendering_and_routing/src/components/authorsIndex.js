"use strict";

const React = require('react');
const Link = require('react-router').Link;
const AUTHORS = require('../authors');

class AuthorsIndex extends React.Component {
  render() {
    return (
      <div>
        <h1>List of authors</h1>
        <ul>{
          Object.keys(AUTHORS).map(id =>
            <li key={id}><Link to={`/author/${id}`}>{AUTHORS[id].name}</Link></li>
          )
        }</ul>
      </div>
    )
  }
}

module.exports = AuthorsIndex;
