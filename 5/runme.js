const { input } = require('./input.js');

/*
                        [Z] [W] [Z]
        [D] [M]         [L] [P] [G]
    [S] [N] [R]         [S] [F] [N]
    [N] [J] [W]     [J] [F] [D] [F]
[N] [H] [G] [J]     [H] [Q] [H] [P]
[V] [J] [T] [F] [H] [Z] [R] [L] [M]
[C] [M] [C] [D] [F] [T] [P] [S] [S]
[S] [Z] [M] [T] [P] [C] [D] [C] [D]
 1   2   3   4   5   6   7   8   9

move 3 from 9 to 6
move 7 from 6 to 2
move 1 from 1 to 5
move 7 from 7 to 1
move 3 from 9 to 7
move 1 from 9 to 1
move 1 from 7 to 2
move 11 from 1 to 8
move 9 from 8 to 2
*/

// @could be coded...
var crates = [
  ['_'],
  'SCVN'.split(''),
  'ZMJHNS'.split(''),
  'MCTGJND'.split(''),
  'TDFJWRM'.split(''),
  'PFH'.split(''),
  'CTZHJ'.split(''),
  'DPRQFSLZ'.split(''),
  'CSLHDFPW'.split(''),
  'DSMPFNGZ'.split(''),
];

const myList = input.toString().trim().split('\n').slice(10);
myList.forEach((order) => {
  const splitLine = order.split(' ');
  const move = parseInt(splitLine[1]);
  const from = parseInt(splitLine[3]);
  const to = parseInt(splitLine[5]);
  for (let i = 0; i < move; i++) {
    crates[to].push(crates[from].pop());
  }
  //console.log(order, move, from, to);
});

var final = crates
  .slice(1)
  .map((crate) => crate.pop())
  .join('');
const partOne = final;
console.log(partOne);

//------------------------------

crates = [
  ['_'],
  'SCVN'.split(''),
  'ZMJHNS'.split(''),
  'MCTGJND'.split(''),
  'TDFJWRM'.split(''),
  'PFH'.split(''),
  'CTZHJ'.split(''),
  'DPRQFSLZ'.split(''),
  'CSLHDFPW'.split(''),
  'DSMPFNGZ'.split(''),
];

myList.forEach((order) => {
  const splitLine = order.split(' ');
  const move = parseInt(splitLine[1]);
  const from = parseInt(splitLine[3]);
  const to = parseInt(splitLine[5]);
  crates[to].push(...crates[from].splice(-move, move));
});

final = crates
  .slice(1)
  .map((crate) => crate.pop())
  .join('');

const partTwo = final;
console.log(partTwo);
