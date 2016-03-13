"use strict";

const React = require('react');
const ReactDOM = require('react-dom');
const AuthorBooks = require('./authorBooks');

window.onload = () => {
  let joyce = {
    author: 'James Joyce',
    books: [
      {id: 1, title: 'Dubliners'},
      {id: 2, title: 'A Portrait of the Artist as a Young Man'},
      {id: 3, title: 'Exiles and poetry'},
      {id: 4, title: 'Ulysses'},
      {id: 5, title: 'Finnegans Wake'}
    ]
  };

  let wells = {
    author: 'Herbert George Wells',
    books: [
      {id: 6, title: 'The Time Machine'},
      {id: 7, title: 'The War of the Worlds'},
      {id: 8, title: 'The First Men in the Moon'},
      {id: 9, title: 'The Invisible Man'}
    ]
  };

  ReactDOM.render(<div><AuthorBooks {... joyce}/><AuthorBooks {... wells}/></div>, document.getElementById('main'))
};
