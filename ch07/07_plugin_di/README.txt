This sample demonstrates how to build a logout plugin for the  authentication server, using dependency injection.
Note: the directory node_modules/authsrv-plugin-logout contains the
code of the logout plugin.

To try the sample first install its dependencies:
  npm install
  
Next, populate the database with some sample users:
  node populate_db
The command above will install the following sample users:
  {username: 'alice', password: 'secret'}
  {username: 'bob', password: 'secret'}
  {username: 'trudy', password: 'secret'}
  
To start the server, run:
  node app

Now, to obtain a new authentication token run:
  curl -X POST -d '{"username": "alice", "password":"secret"}' http://localhost:3000/login -H "Content-Type: application/json"

To check the validity of a token:
  curl -X GET -H "Accept: application/json" http://localhost:3000/checkToken?token=<TOKEN HERE>
  
To invalidate a token:
  curl -X GET -H "Accept: application/json" http://localhost:3000/logout?token=<TOKEN HERE>
