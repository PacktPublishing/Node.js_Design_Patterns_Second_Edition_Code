This sample demonstrates the problems we can have when using an asynchronously
initialized module without considering its initialization state.

To try the sample, first start the server:
  node app
  
Then with a browser navigate to the url:
  http://localhost:8000/say

Within 10 seconds from the startup of the server, 
the expected result should be an error message like the following:
  Error:I don't have anything to say right now
  
After 10 seconds, the the async module is fully initialized and 
the server should start returning the current time:
  I say: Current time is: <CURRENT TIME>
