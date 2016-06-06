This sample shows how to build a Node.js-based load balancer which
works in combination with a service registry.

Before running the app, install the dependencies:
  npm install
  
Then install consul follow instructions on the official website:
  https://www.consul.io/intro/getting-started/install.html
  
Start the consul dev agent with:
  consul agent -dev
  
Run the load balancer with:
  node loadBalancer
  
Start a set of sample HTTP services
  node app api-service
  node app api-service
  node app webapp-service
  
Hit the load balancer at the address:
  http://localhost:8080
Or
  http://localhost:8080/api
  
Try to start and stop the servers to see the load balancer automatically
adapting to the changes.
