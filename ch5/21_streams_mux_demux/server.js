"use strict";

function demultiplexChannel(source, destinations) {
  let currentChannel = null;
  let currentLength = null;
  source
    .on('readable', () => { //[1]
      var chunk;
      if(currentChannel === null) {          //[2]
      chunk = this.read(1);
      currentChannel = chunk && chunk.readUInt8(0);
    }
    
    if(currentLength === null) {          //[3]
      chunk = this.read(4);
      currentLength = chunk && chunk.readUInt32BE(0);
      if(currentLength === null) {
        return;
      }
    }
    
    chunk = this.read(currentLength);        //[4]
    if(chunk === null) {
      return;
    }
    
    console.log('Received packet from: ' + currentChannel);
    
    destinations[currentChannel].write(chunk);      //[5]
    currentChannel = null;
    currentLength = null;
    
  })
  .on('end', function() {            //[6]
    destinations.forEach(destination => destination.end());
    console.log('Source channel closed');
  });
}

net.createServer(function(socket) {
  let stdoutStream = fs.createWriteStream('stdout.log');
  let stderrStream = fs.createWriteStream('stderr.log');
  demultiplexChannel(socket, [stdoutStream, stderrStream]); 
})
  .listen(3000, () => console.log('Server started'))
;
