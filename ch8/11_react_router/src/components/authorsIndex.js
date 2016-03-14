"use strict";

const React = require('react');
const Link = require('react-router').Link;

const authors = [
  {id: 1, name: 'James Joyce', slug: 'joyce'},
  {id: 2, name: 'Herbert George Wells', slug: 'h-g-wells'}
];

class AuthorsIndex extends React.Component {
  render() {
    return (
      <div>
        <h1>List of authors</h1>
        <ul>{
          authors.map( author =>
            <li key={author.id}><Link to={`/author/${author.slug}`}>{author.name}</Link></li>
          )
        }</ul>
      </div>
    )
  }
}

module.exports = AuthorsIndex;
