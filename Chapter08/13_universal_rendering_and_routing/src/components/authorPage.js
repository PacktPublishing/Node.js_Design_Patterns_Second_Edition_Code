"use strict";

const React = require('react');
const Link = require('react-router').Link;
const AUTHORS = require('../authors');

class AuthorPage extends React.Component {
  render() {
    let author = AUTHORS[this.props.params.id];
    return (
      <div>
        <h2>{author.name}'s major works</h2>
        <ul className="books">{
          author.books.map( (book, key) =>
            <li key={key} className="book">{book}</li>
          )
        }</ul>
        <Link to="/">Go back to index</Link>
      </div>
    );
  }
}

module.exports = AuthorPage;
