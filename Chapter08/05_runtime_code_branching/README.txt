This example shows how to implement runtime code branching for universal apps.

We have a very simple javascript file that outputs a different message in the console whether you are running it in
Node.js or in the browser.

Before running the examples you need to install the dependencies with:

  npm install

Then you need to generate the bundle file for the browser with:

  node_modules/.bin/webpack

Finally you can run the script on the browser by just opening main.html and looking at the debug console, or run the
script in Node.js with:

  node src/main.js
