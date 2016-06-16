This example shows how to use webpack to create a bundle for the browser containing
your javascript code and your dependencies.

Before running the example you need to install the dependencies with

  npm install
  
Then you need to invoke webpack to generate your bundle file from the sources:

  node_modules/.bin/webpack main.js bundle.js
  
or simply

  webpack main.js bundle.js # (if you installed webpack globally)
  
Then you just need to open magic.html to see the example running in your browser
