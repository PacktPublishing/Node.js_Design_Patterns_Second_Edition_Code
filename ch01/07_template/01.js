"use strict";

let name = "Leonardo";
let interests = ["arts", "architecture", "science", "music", "mathematics"];
let birth = { year : 1452, place : 'Florence' };
let text = `${name} was an Italian polymath interested in many topics such
as ${interests.join(', ')}.
He was born in ${birth.year} in ${birth.place}.`;
console.log(text);