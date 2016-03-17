"use strict";

const React = require('react');
const ReactDOM = require('react-dom');
const Routes = require('./routes');

window.onload = () => {
  ReactDOM.render(<Routes/>, document.getElementById('main'))
};
