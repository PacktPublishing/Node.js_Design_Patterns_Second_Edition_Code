This sample demonstrates how to run a CPU-bound task in Node.js
using setImmediate or multiple processes.

To start the server, run:
  node app

Then try to send one or more request to trigger the subset sum task:
  curl -G http://localhost:8000/subsetSum --data-urlencode "data=[116,119,101,101,-116,109,101,-105,-102,117,-115,-97,119,-116,-104,-105,115]" --data-urlencode "sum=0"
  
While a subset sum task is running, you can check the responsiveness of the server with a command like this:
  curl -G http://localhost:8000
  
If the subset sum takes too long on your machine or is too fast for trying to check the responsiveness of the server, try to reduce or increase the number of items of the array given as input.

In the file app.js, try to swap between the various implementations
of the subsetSum API to compare the differences in the responsiveness of the 
server.

//var SubsetSum = require('./subsetSum');
//var SubsetSum = require('./subsetSumDefer');
//var SubsetSum = require('./subsetSumFork');
