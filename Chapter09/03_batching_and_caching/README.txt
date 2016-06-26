This sample demonstrates how asynchronous batching and caching work.

To try the sample, first install its dependencies:
  npm install
  
Next, populate the database with some sample data:
  node populate_db
The command above will create 100000 random sales transactions
in the format:
  {amount, item}
  
Next, to start the server, run:
  node app

To test the server with multiple concurrent request, simply run:
  node loadTest

In the file app.js, try to swap between the various implementations
of the totalSales API to compare their performances. Please notice that
using the vanilla implementation (totalSales) the load test may 
take up to a minute or more to complete.

//var totalSales = require('./totalSales');
//var totalSales = require('./totalSalesBatch');
//var totalSales = require('./totalSalesCache');

To try the implementation using caching and promises you need to run
another module (instead of running app.js):
  node appPromises
