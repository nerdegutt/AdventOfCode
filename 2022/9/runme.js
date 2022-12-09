const { input } = require('./input.js');

const moves = input.toString().trim().split('\n');

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

let hPosX = 0,
  hPosY = 0,
  tPosX = 0,
  tPosY = 0,
  hPos = [hPosX, hPosY],
  tPos = [tPosX, tPosY],
  tStack = new Set();

function getNextTailPosition([hx, hy], [tx, ty]) {
  let dx = hx - tx,
    dy = hy - ty;
  //console.log({ dx, dy });
  if (dx > 1) {
    // moved right
    return [++tx, (ty += dy)];
  } else if (dx < -1) {
    // moved left
    return [--tx, (ty += dy)];
  } else if (dy > 1) {
    // moved up
    return [(tx += dx), ++ty];
  } else if (dy < -1) {
    // moved down
    return [(tx += dx), --ty];
  }
  return [tx, ty];
}

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

let partTwo;
console.log('Part two: ', partTwo);
