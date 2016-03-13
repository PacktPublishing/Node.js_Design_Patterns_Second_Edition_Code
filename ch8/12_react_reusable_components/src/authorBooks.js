"use strict";

const React = require('react');

class AuthorBooks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      author: props.author,
      books: props.books
    };
  }

  render() {
    return (
      <div>
        <h2>{this.state.author}'s major works</h2>
        <ul className="books">{
          this.state.books.map( book =>
              <li key={book.id} className="book">{book.title}</li>
          )
        }</ul>
      </div>
    );
  }
}

module.exports = AuthorBooks;
