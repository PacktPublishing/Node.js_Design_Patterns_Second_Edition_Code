"use strict";

const React = require('react');

class AuthorBooks extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.author}'s major works</h2>
        <ul className="books">{
          this.props.books.map( book =>
            <li key={book.id} className="book">{book.title}</li>
          )
        }</ul>
      </div>
    );
  }
}

module.exports = AuthorBooks;
