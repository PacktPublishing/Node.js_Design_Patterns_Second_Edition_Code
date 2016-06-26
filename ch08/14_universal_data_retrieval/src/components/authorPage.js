"use strict";

const React = require('react');
const Link = require('react-router').Link;
const xhrClient = require('../xhrClient');

class AuthorPage extends React.Component {
  static loadProps(context, cb) {
    xhrClient.get(`authors/${context.params.id}`)
      .then(response => {
        const author = response.data;
        cb(null, {author});
      })
      .catch(error => cb(error))
    ;
  }

  render() {
    return (
      <div>
        <h2>{this.props.author.name}'s major works</h2>
        <ul className="books">{
          this.props.author.books.map( (book, key) =>
            <li key={key} className="book">{book}</li>
          )
        }</ul>
        <Link to="/">Go back to index</Link>
      </div>
    );
  }
}

module.exports = AuthorPage;
