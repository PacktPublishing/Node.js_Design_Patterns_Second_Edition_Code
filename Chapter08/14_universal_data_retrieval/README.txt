This example shows how to implement a react app that is able to load asynchronous
components and to make API request both from the server and the client to
render them.

Before running the examples you need to install the dependencies with:

  npm install

Then you need to generate the bundle file with webpack:

  node_modules/.bin/webpack

Then you need to run the webServer using babel-cli:

  node_modules/.bin/babel-node webServer

Finally you need to run the apiServer using

  node apiServer

Now you can point your browser to http://localhost:3000 to run the app.
