const { input } = require('./input.js');

const history = input.toString().trim().split('\n');

var stack = [];
var fs = new Map();
fs.set('/', new Map());
var cwd = fs;
var upNext;
var cmd = [];

while ((upNext = history.shift())) {
  cmd = upNext.split(' ');
  if ('$' === cmd[0]) {
    if ('cd' === cmd[1]) {
      if ('..' === cmd[2]) {
        stack.pop();
        cwd = stack[stack.length - 1];
      } else {
        cwd = cwd.get(cmd[2]);
        stack.push(cwd);
      }
    } else if ('ls' === cmd[1]) {
      let line;
      while (history.length) {
        if (history[0].startsWith('$')) break;
        line = history.shift().split(' ');
        if ('dir' === line[0]) {
          cwd.set(line[1], new Map());
        } else {
          cwd.set(line[1], parseInt(line[0]));
        }
      }
    }
  } else {
    console.log('Should not happen');
  }
}

const partOne = fs;
console.log(partOne);

//------------------------------

const partTwo = partOne;
//console.log(partTwo);
