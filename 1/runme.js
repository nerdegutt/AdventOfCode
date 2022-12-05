const { input } = require('./input.js');

const sortedList = input
  .toString()
  .trim()
  .split('\n\n')
  .map((elf) => {
    return elf
      .split('\n')
      .map((cal) => parseInt(cal))
      .reduce((sum, value) => sum + value);
  })
  .sort((a, b) => b - a);

const partOne = sortedList[0];

console.log(partOne);

const partTwo = sortedList.slice(0, 3).reduce((sum, value) => sum + value, 0);

console.log(partTwo);
