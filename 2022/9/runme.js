const { input } = require('./input.js');

const moves = input.toString().trim().split('\n').slice(0, 9999);

/*//
const moves = `
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`
  .trim()
  .split('\n');
//**/

/*//
const moves = `
R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20
`
  .trim()
  .split('\n');
//*/

function getNextTailPosition([hx, hy], [tx, ty]) {
  let dx = hx - tx,
    dy = hy - ty;
  //console.log({ dx, dy });
  if (dx > 1) {
    // moved right
    return [++tx, ty + dy];
  } else if (dx < -1) {
    // moved left
    return [--tx, ty + dy];
  } else if (dy > 1) {
    // moved up
    return [tx + dx, ++ty];
  } else if (dy < -1) {
    // moved down
    return [tx + dx, --ty];
  }
  return [tx, ty];
}

let hPosX = 0,
  hPosY = 0,
  tPosX = 0,
  tPosY = 0,
  hPos = [hPosX, hPosY],
  tPos = [tPosX, tPosY],
  tStack = new Set();

moves.forEach((move, i) => {
  let [direction, length] = move.split(' ');
  length = parseInt(length);

  for (let i = 0; i < length; i++) {
    //console.log({ hPos, direction });
    switch (direction) {
      case 'R':
        hPos = [++hPosX, hPosY];
        break;
      case 'L':
        hPos = [--hPosX, hPosY];
        break;
      case 'U':
        hPos = [hPosX, ++hPosY];
        break;
      case 'D':
        hPos = [hPosX, --hPosY];
        break;
    }
    tPos = getNextTailPosition(hPos, tPos);
    tStack.add(tPos.join('-')); // Equal arrays in set will be considered different

    //console.log({ hPos, tPos });
  }
});

const partOne = tStack.size;
console.log('Part one: ', partOne);

//------------------------------

let kStack = new Set();
const numberOfKnots = 10;
let knots = Array(numberOfKnots).fill([0, 0]);
let totalMoveCount = 0;
let minX = 0,
  maxX = 0,
  minY = 0,
  maxY = 0;

moves.forEach((move, lineNumber) => {
  let [direction, length] = move.split(' ');
  length = parseInt(length);

  for (let i = 0; i < length; i++) {
    // move the head
    //console.log('HEAD', knots[0], direction);
    switch (direction) {
      case 'R':
        knots[0] = [knots[0][0] + 1, knots[0][1]];
        break;
      case 'L':
        knots[0] = [knots[0][0] - 1, knots[0][1]];
        break;
      case 'U':
        knots[0] = [knots[0][0], knots[0][1] + 1];
        break;
      case 'D':
        knots[0] = [knots[0][0], knots[0][1] - 1];
        break;
    }
    if (knots[0][0] < minX) minX = knots[0][0];
    if (knots[0][0] > maxX) maxX = knots[0][0];
    if (knots[0][1] > maxY) maxY = knots[0][1];
    if (knots[0][1] < minY) minY = knots[0][1];

    for (let k = 1; k < numberOfKnots; k++) {
      // let the tails follow
      knots[k] = getNextTailPosition(knots[k - 1], knots[k]);
      kStack.add(knots[numberOfKnots - 1].join('X')); // Equal arrays in set will be considered different
      //console.log(kStack.size);
    }
    /*//
    console.log(
      lineNumber,
      ++totalMoveCount,
      knots[0],
      knots[1],
      knots[2],
      knots[3],
      knots[4],
      knots[5],
      knots[6],
      knots[7],
      knots[8],
      knots[9]
    );
    //*/
  }

  //console.log(knots[0], knots[numberOfKnots - 1]);
});

let partTwo = kStack.size;
console.log('Part two: ', partTwo);

// Plot this horrible thing

for (let r = maxY; r >= minY; r--) {
  let line = '';
  for (let c = minX; c < maxX; c++) {
    if (r == 0 && c == 0) line += 's';
    else line += kStack.has(`${c}X${r}`) ? '#' : '.';
  }
  console.log(line);
}
