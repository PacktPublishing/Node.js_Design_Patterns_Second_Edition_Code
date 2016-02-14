"use strict";

function download(url, filename, callback) {
    console.log('Downloading ' + url);
    var body;

    async.series([
        callback => {           //[1]
            request(url, (err, response, resBody) => {
                if(err) {
                    return callback(err);
                }
                body = resBody;
            callback();
            });
        },

        mkdirp.bind(null, path.dirname(filename)),    //[2]

        callback => {           //[3]
            fs.writeFile(filename, body, callback);
        }
    ], err => {         //[4]
        console.log('Downloaded and saved: ' + url);
        if(err) {
            return callback(err);
        }
        callback(null, body);
    });
}
