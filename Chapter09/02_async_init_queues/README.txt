This sample demonstrate how to shield an asynchronously initialized module 
from improper usage, by implementing pre-initialization queues.

To try the sample, first start the server:
  node app
  
Then with a browser navigate to the url:
  http://localhost:8000/say

The expected result should always be a message containing the current
time, like the following:
  I say: Current time is: <CURRENT TIME>
