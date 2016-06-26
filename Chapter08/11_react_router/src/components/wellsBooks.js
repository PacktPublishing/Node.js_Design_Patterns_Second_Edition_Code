"use strict";

const React = require('react');
const Link = require('react-router').Link;

const books = [
  'The Time Machine',
  'The War of the Worlds',
  'The First Men in the Moon',
  'The Invisible Man'
];

class WellsBooks extends React.Component {
  render() {
    return (
      <div>
        <h2>Herbert George Wells's major works</h2>
        <ul className="books">{
          books.map( (book, key) =>
            <li key={key} className="book">{book}</li>
          )
        }</ul>
        <Link to="/">Go back to index</Link>
      </div>
    );
  }
}

module.exports = WellsBooks;
