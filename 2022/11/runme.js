const { input } = require('./input.js');

const notes = input.toString().trim().split('\n');

/*//
const notes = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`.split('\n');
//**/

let monkeys = [];
const rounds = 20;
const worryReductionFactor = 3;

while (notes.length) {
  monkeys[notes.shift().split(' ')[1].split(':')[0]] = {
    startingItems: notes
      .shift()
      .split(':')[1]
      .trim()
      .split(',')
      .map((i) => i.trim())
      .map((i) => parseInt(i)),
    operation: notes.shift().split(' = ')[1].trim(),
    testDivider: parseInt(notes.shift().split(' ').pop()),
    testTrue: notes.shift().split(' ').pop(),
    testFalse: notes.shift().split(' ').pop(),
    inspectCount: 0,
  };
  notes.shift();
}

for (let r = 0; r < rounds; r++) {
  monkeys.forEach((monkey, index) => {
    let old;
    while ((old = monkey.startingItems.shift())) {
      let worryLevel = Math.floor(eval(monkey.operation) / worryReductionFactor);
      //let worryLevel = eval(monkey.operation); // playing with part 2
      let receivingMonkey =
        0 === worryLevel % monkey.testDivider ? monkey.testTrue : monkey.testFalse;
      monkeys[receivingMonkey].startingItems.push(worryLevel);
      monkey.inspectCount++;
    }
  });
}

console.log(
  'Inspect counts: ',
  monkeys.map((monkey, index) => {
    return `Monkey ${index}: ${monkey.inspectCount}`;
  })
);

const monkeyBusinessLevel = monkeys
  .map((monkey) => monkey.inspectCount)
  .sort((a, b) => b - a)
  .slice(0, 2)
  .reduce((sum, value) => sum * value, 1);

const partOne = monkeyBusinessLevel;
console.log('Part one: ', partOne);

//------------------------------

let partTwo;
console.log('Part two: ', partTwo);
