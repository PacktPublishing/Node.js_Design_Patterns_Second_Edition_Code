"use strict";

module.exports = class ZmqMiddlewareManager
{
    constructor (socket) {
        this.socket = socket;
        this.inboundMiddleware = [];           //[1]
        this.outboundMiddleware = [];
        socket.on('message', message => {       //[2]
            this.executeMiddleware(this.inboundMiddleware, {
                data: message
            });
        });
    }

    send (data) {
        var message = {
            data: data
        };

        this.executeMiddleware (this.outboundMiddleware, message,
            () => {
                this.socket.send(message.data);
            }
        );
    }

    use (middleware) {
        if (middleware.inbound) {
            this.inboundMiddleware.push(middleware.inbound);
        }
        if (middleware.outbound) {
            this.outboundMiddleware.unshift(middleware.outbound);
        }
    }

    executeMiddleware (middleware, arg, finish) {
        middleware.forEach((middlewareFunc, index) => {
            middlewareFunc.call(this, arg, err => {
                if(err) {
                    console.log('There was an error: ' + err.message);
                }
            });

            if (index === middleware.length - 1) {
                return finish && finish();
            }
        });
    }
};
