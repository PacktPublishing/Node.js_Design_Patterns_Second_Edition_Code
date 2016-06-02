This example shows how to implement an adapter for the standard fs library that instead of using the filesystem
uses level db.

Before running the examples you need to install the dependencies with:

  npm install

Then you can run the first example with:

  node testFs

This first example does not use our adapter so it will create a regular file and produce an error when trying to read a
missing file.

Then you can run the second example:

  node testFsAdapter

This example finally uses our adapter to perform the same operations of the previous one. You will notice that it will
produce the same output of the first example but this time no file will be generated and all the data will be stored
inside a fresh level db database stored in the fsDB folder.
