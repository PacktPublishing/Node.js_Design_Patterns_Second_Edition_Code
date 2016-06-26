This sample demonstrates how run parallel tasks using ZMQ

As pre-requisite to this sample, you first need to install the ZMQ binaries:
  http://zeromq.org/intro:get-the-software

To try the sample, install its dependencies:
  npm install

Then run (in separate terminals):
  node worker
  node worker
  node sink
  node ventilator 4 f8e966d1e207d02c44511a58dccff2f5429e9a3b
