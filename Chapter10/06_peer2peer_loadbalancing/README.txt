This sample demonstrates how to distribute the traffic
across multiple servers without the need of a standalone load balancer.
  
Start two instances of our sample HTTP server:
  node app 8081
  node app 8082
  
Run the client application with:
  node client
