"use strict";

// This script will fail because of undefined variables.
// These variables will be replaced at build time by webpack.
// The runnable file will be found in dist/bundle.js

const now = __NOW__;
const platform = __PLATFORM__;
const host = __HOST__;

console.log(`Bundle compiled on "${now}" on "${platform}" by "${host}"`);
