"use strict";

const s = new Set([0, 1, 2, 3]);

s.add(3); // will not be added
s.size; // 4
s.delete(0);
s.has(0); // false

for (let entry of s) {
  console.log(entry);
}
