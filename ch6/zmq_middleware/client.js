"use strict";

var zmq = require('zmq');
var ZmqMiddlewareManager = require('./zmqMiddlewareManager');
var jsonMiddleware = require('./jsonMiddleware');

var request = zmq.socket('req');
request.connect('tcp://127.0.0.1:5000');

var zmqm = new ZmqMiddlewareManager(request);

zmqm.use(jsonMiddleware.json());
zmqm.use({
    inbound: function(message, next) {
        console.log('Echoed back: ', message.data);
        next();
    }
});

setInterval(function() {
    zmqm.send({action: 'ping', echo: Date.now()});
}, 1000);
