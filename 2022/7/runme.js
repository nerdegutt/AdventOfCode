const { input } = require('./input.js');

const history = input.toString().trim().split('\n');
/* const history = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`.split('\n'); */

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

var totalMax100k = 0;
var allDirs = [];

function calculateSize(name, dir) {
  let currentSize = 0;
  dir.forEach((value, key) => {
    if (typeof value === 'object') {
      currentSize += calculateSize(key, value);
    } else {
      currentSize += value;
    }
  });
  //console.log(name, currentSize);
  if (currentSize <= 100_000) totalMax100k += currentSize;
  allDirs.push(currentSize);
  return currentSize;
}

const usedSpace = calculateSize('/', fs.get('/'));

const partOne = totalMax100k;
console.log(partOne);

//------------------------------

const freeSpace = 70_000_000 - usedSpace;
const minimumToDelete = 30_000_000 - freeSpace;

const partTwo = allDirs.filter((val) => val > minimumToDelete).sort((a, b) => a - b)[0];
console.log(partTwo);
