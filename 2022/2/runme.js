const { input } = require('./input.js');

/*
Loss: 0
Draw: 3
Win: 6

A=X=Rock: 1
B=Y=Paper: 2
C=Z=Scissors: 3
*/

const scores = {
  AX: 3 + 1,
  AY: 6 + 2,
  AZ: 0 + 3,
  BX: 0 + 1,
  BY: 3 + 2,
  BZ: 6 + 3,
  CX: 6 + 1,
  CY: 0 + 2,
  CZ: 3 + 3,
};

const scoreList = input
  .toString()
  .trim()
  .split('\n')
  .map((match) => scores[match.replace(' ', '')]);

const partOne = scoreList.reduce((sum, value) => sum + value, 0);
console.log(partOne);

/*
Loss: 0
Draw: 3
Win: 6

A=Rock: 1
B=Paper: 2
C=Scissors: 3

X=Lose
Y=Draw
Z=Win
*/

const scores2 = {
  AX: 0 + 3,
  AY: 3 + 1,
  AZ: 6 + 2,
  BX: 0 + 1,
  BY: 3 + 2,
  BZ: 6 + 3,
  CX: 0 + 2,
  CY: 3 + 3,
  CZ: 6 + 1,
};

const scoreList2 = input
  .toString()
  .trim()
  .split('\n')
  .map((match) => scores2[match.replace(' ', '')]);

const partTwo = scoreList2.reduce((sum, value) => sum + value, 0);

console.log(partTwo);
