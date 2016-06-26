This sample demonstrate how run parallel tasks using AMQP

As pre-requisite to this sample, you first need to install RabbitMQ
  http://www.rabbitmq.com/download.html

To try the sample install the dependencies:
  npm install

Then run (in separate terminals):
  node worker
  node worker
  node collector
  node producer 4 f8e966d1e207d02c44511a58dccff2f5429e9a3b
