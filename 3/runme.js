const { input } = require('./input.js');

const itemTypes = [...'_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'];

const a_code = 'a'.charCodeAt(0);
const A_code = 'A'.charCodeAt(0);

var first = '';
var second = '';

function intersect(a, b) {
  var setB = new Set(b);
  return [...new Set(a)].filter((x) => setB.has(x));
}

const myList = input
  .toString()
  .trim()
  .split('\n')
  .map((allItems, index) => {
    first = allItems.substring(0, allItems.length / 2);
    second = allItems.substring(allItems.length / 2);
    const common = intersect(first, second);
    const priority = itemTypes.indexOf(common[0]);
    return priority;
  });

const partOne = myList.reduce((sum, value) => sum + value);
console.log(partOne);

const myList2 = input.toString().trim().split('\n');

var total = 0;
for (var i = 0; i < myList2.length; i += 3) {
  const [itemType] = intersect(
    myList2[i],
    intersect(myList2[i + 1], myList2[i + 2])
  );
  total += itemTypes.indexOf(itemType);
}

const partTwo = total;
console.log(partTwo);
