const { input } = require('./input.js');

const myBuffer = input.toString().trim();
var marker = new Set();

var n = 4;

for (var c = 0; c < myBuffer.length - n; c++) {
  marker.clear();
  for (var a = 0; a < n; a++) {
    marker.add(myBuffer.charAt(c + a));
  }
  if (marker.size === n) break;
}

const partOne = c + n;
console.log(partOne);

//------------------------------

// Being lazy, copy paste faster than making function

var n = 14;

for (var c = 0; c < myBuffer.length - n; c++) {
  marker.clear();
  for (var a = 0; a < n; a++) {
    marker.add(myBuffer.charAt(c + a));
  }
  if (marker.size === n) break;
}

const partTwo = c + n;
console.log(partTwo);
