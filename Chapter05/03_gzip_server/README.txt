This example shows a simple file server that accepts a gzipped file from a 
client, it decompresses it and stores it inside the current folder.

To run the server you need to launch:
  node gzipReceive

Than you can send any file with:
  node gzipSend <pathOfTheFileToSend> localhost
