"use strict";

const ticker = require('./ticker');

ticker.on('tick', (tickCount) => console.log(tickCount, 'TICK'));
// ticker.emit('something', {}); <-- This will fail
// require('events').prototype.emit.call(ticker, 'someEvent', {}); <-- This workaround will instead work
