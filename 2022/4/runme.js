const { input } = require('./input.js');

var a1 = 0,
  a2 = 0,
  b1 = 0,
  b2 = 0,
  ad = 0,
  bd = 0,
  keeper = false,
  numbers = [];

// 91-93,6-92

const myList = input
  .toString()
  .trim()
  .split('\n')
  .filter((raw) => {
    keeper = false;
    numbers = raw.replace(',', '-').split('-');
    a1 = parseInt(numbers[0]);
    a2 = parseInt(numbers[1]);
    b1 = parseInt(numbers[2]);
    b2 = parseInt(numbers[3]);
    ad = a2 - a1 + 1;
    bd = b2 - b1 + 1;
    if (ad >= bd) {
      // first range bigger (or equal)
      if (b1 >= a1 && b2 <= a2) keeper = true;
    } else {
      // second range bigger (or equal)
      if (a1 >= b1 && a2 <= b2) keeper = true;
    }
    //console.log(raw, ad, bd, keeper);
    return keeper;
  });

const partOne = myList.length;
console.log(partOne);

const myList2 = input
  .toString()
  .trim()
  .split('\n')
  .filter((raw) => {
    keeper = false;
    numbers = raw.replace(',', '-').split('-');
    a1 = parseInt(numbers[0]);
    a2 = parseInt(numbers[1]);
    b1 = parseInt(numbers[2]);
    b2 = parseInt(numbers[3]);
    ad = a2 - a1 + 1;
    bd = b2 - b1 + 1;
    if (a1 >= b1) {
      // first range higher number (or equal)
      if (b2 >= a1) keeper = true;
    } else {
      // second range higher number (or equal)
      if (a2 >= b1) keeper = true;
    }
    //console.log(raw, ad, bd, keeper);
    return keeper;
  });

const partTwo = myList2.length;
console.log(partTwo);
