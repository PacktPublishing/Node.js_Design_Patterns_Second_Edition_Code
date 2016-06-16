"use strict";

if (typeof __BROWSER__ !== "undefined") {
  console.log('Hey browser!');
} else {
  console.log('Hey Node.js!');
}