"use strict";

if (typeof window !== "undefined" && window.document) {
  console.log('Hey browser!');
} else {
  console.log('Hey Node.js!');
}