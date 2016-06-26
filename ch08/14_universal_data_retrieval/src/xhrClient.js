"use strict";

const Axios = require('axios');

const baseURL = typeof window !== 'undefined' ? '/api' : 'http://localhost:3001';
const xhrClient = Axios.create({baseURL});

module.exports = xhrClient;
