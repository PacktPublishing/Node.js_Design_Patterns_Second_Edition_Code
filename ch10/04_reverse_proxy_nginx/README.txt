This sample shows how to load balance a Node.js application
using Nginx.

To try the sample, first start multiple instances of the same HTTP server, using different ports:
  node app 8081
  node app 8082
  node app 8083
  node app 8084
  
Then, use the provided configuration (nginx.patch.conf) as reference to modify the global Nginx configuration file
(usually located into /etc/nginx/nginx.conf).
Then reload the server with:
  nginx -s reload

Access the server at:
  http://localhost
