This sample demonstrates how to integrate a chat application and a history service using AMQP

As pre-requisite to this sample, you first need to install RabbitMQ
  http://www.rabbitmq.com/download.html

To try the sample, install the dependencies:
  npm install

Then run (in separate terminals):
  node app 8080
  node app 8081
  node historySvc
  
You can try to access at the same time those addresses:
  http://localhost:8080
  http://localhost:8081
