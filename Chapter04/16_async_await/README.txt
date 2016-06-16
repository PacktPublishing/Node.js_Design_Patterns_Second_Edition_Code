This sample demonstrates how to use the "futuristic" async await syntax to run asynchronous operations.

install all the dependencies with:
  npm install

To compile (or "transpile") the source code using async await you need to use Babel.
You will find a compiled version called index.es5.js that you can run yourself with:
  node index.es5.js

But if you want to compile and run the original source code with Babel you need to run:
  node_modules/.bin/babel-node --plugins "syntax-async-functions,transform-async-to-generator" index.js
