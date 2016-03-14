"use strict";

const Axios = require('axios');

let baseURL = typeof window !== 'undefined' ? '/api' : 'http://localhost:3001';
let xhrClient = Axios.create({baseURL});

module.exports = xhrClient;
