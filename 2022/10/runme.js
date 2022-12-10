const { input } = require('./input.js');

const instructions = input.toString().trim().split('\n');

let cycle = 1;
let register = 1;
let signals = [];

const cyclesPerOperation = new Map();
cyclesPerOperation.set('noop', 1);
cyclesPerOperation.set('addx', 2);

const signalIndexStart = 20;
const signalIndexDelta = 40;
const lastSignalIndex = 220;

let interestingSignals = new Set();

for (let s = signalIndexStart; s <= lastSignalIndex; s += signalIndexDelta) {
  //console.log(s);
  interestingSignals.add(s);
}

instructions.forEach((line, i) => {
  let [cmd, value] = line.split(' ');
  value = 'noop' === cmd ? 0 : parseInt(value);

  for (c = 0; c < cyclesPerOperation.get(cmd); c++) {
    if (interestingSignals.has(cycle)) {
      signals.push(cycle * register);
    }
    //console.log({ cycle, register });
    cycle++;
  }
  register += value;
});

//console.log(signals);
let partOne = signals.reduce((sum, value) => sum + value);
console.log('Part one: ', partOne);

//------------------------------

cycle = 1;
register = 1;
const crtWidth = 40;
let rows = [];
let row = '';
let xPos = 1;

instructions.forEach((line, i) => {
  let [cmd, value] = line.split(' ');
  value = 'noop' === cmd ? 0 : parseInt(value);

  for (c = 0; c < cyclesPerOperation.get(cmd); c++) {
    xPos = cycle % crtWidth;

    // Draw pixel if register (sprite) covers cycle (column) position
    // Remember that xPos is a modulus, thus offset by 1 from cycle
    row += register >= xPos - 2 && register <= xPos ? '#' : '.';
    //console.log(cycle, xPos, register, row);

    ++cycle;
    if (cycle > crtWidth && 0 === xPos) {
      rows.push(row);
      row = '';
    }
  }
  register += value;
});

let partTwo = '\n' + rows.join('\n');
console.log('Part two: ', partTwo);
