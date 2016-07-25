This example shows how to implement a react app that is both rendered on the
server (at first access) and on the browser (after any interaction with the page)

Before running the examples you need to install the dependencies with:

  npm install

Then you need to generate the bundle file with webpack:

  node_modules/.bin/webpack

Then you need to run the server using babel-cli:

  node_modules/.bin/babel-node server.js

Finally you can point your browser to http://localhost:3000 to run the app.
