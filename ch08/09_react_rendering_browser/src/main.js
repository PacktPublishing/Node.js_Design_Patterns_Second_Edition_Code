"use strict";

const React = require('react');
const ReactDOM = require('react-dom');
const JoyceBooks = require('./joyceBooks');

window.onload = () => {
  ReactDOM.render(<JoyceBooks/>, document.getElementById('main'))
};
