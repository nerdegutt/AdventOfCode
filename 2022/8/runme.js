const { input } = require('./input.js');

const forest = input.toString().trim().split('\n');

/*//
const forest = `30373
25512
65332
33549
35390`.split('\n');
//**/

let grid = forest.map((row) => row.split('').map((tree) => parseInt(tree)));

const numRows = grid.length,
  numCols = grid[0].length;
const edge = 2 * numRows + 2 * numCols - 4;

// Could probably been done more efficiently by sorting heights and building something around that

var visibleCount = 0;
grid.forEach((row, ri) => {
  row.forEach((height, ci) => {
    // count only inner trees
    if (ri > 0 && ri < numRows - 1 && ci > 0 && ci < numCols - 1) {
      //console.log('Checking ', ri, ci, height);
      let visibleLeft = true;
      let visibleRight = true;
      let visibleAbove = true;
      let visibleBelow = true;
      // left of tree
      for (let c = 0; c < ci && visibleLeft; c++) {
        if (grid[ri][c] >= height) {
          //console.log('LEFT: ', grid[ri][c], 'higher or equal');
          visibleLeft = false;
        }
      }
      // right of tree
      for (let c = ci + 1; c < numCols && visibleRight; c++) {
        if (grid[ri][c] >= height) {
          //console.log('RIGHT: ', grid[ri][c], 'higher or equal');
          visibleRight = false;
        }
      }
      // above tree
      for (let r = 0; r < ri && visibleAbove; r++) {
        if (grid[r][ci] >= height) {
          //console.log('ABOVE: ', grid[r][ci], 'higher or equal');
          visibleAbove = false;
        }
      }
      // below tree
      for (let r = ri + 1; r < numRows && visibleBelow; r++) {
        if (grid[r][ci] >= height) {
          //console.log('BELOW: ', grid[r][ci], 'higher or equal');
          visibleBelow = false;
        }
      }
      if (visibleLeft || visibleRight || visibleAbove || visibleBelow) visibleCount++;
    }
  });
});

console.log('Edge:  ', edge);
console.log('Inner: ', visibleCount);

const partOne = edge + visibleCount;
console.log('Part one: ', partOne);

//------------------------------

let scenicScores = [];
grid.forEach((row, ri) => {
  row.forEach((height, ci) => {
    // count only inner trees
    if (ri > 0 && ri < numRows - 1 && ci > 0 && ci < numCols - 1) {
      // console.log('Checking ', ri, ci, height);
      let distanceLeft = 0;
      let distanceRight = 0;
      let distanceAbove = 0;
      let distanceBelow = 0;
      // left of tree
      for (let c = ci - 1, d = 1; c >= 0; c--) {
        distanceLeft = d;
        if (grid[ri][c] >= height) {
          //console.log('LEFT: ', grid[ri][c], 'higher or equal');
          //console.log(d);
          break;
        }
        d++;
      }
      // right of tree
      for (let c = ci + 1, d = 1; c < numCols; c++) {
        distanceRight = d;
        if (grid[ri][c] >= height) {
          //console.log('RIGHT: ', grid[ri][c], 'higher or equal');
          //console.log(d);
          break;
        }
        d++;
      }
      // above tree
      for (let r = ri - 1, d = 1; r >= 0; r--) {
        distanceAbove = d;
        if (grid[r][ci] >= height) {
          //console.log('ABOVE: ', grid[r][ci], 'higher or equal');
          //console.log(d);
          break;
        }
        d++;
      }
      // below tree
      for (let r = ri + 1, d = 1; r < numRows; r++) {
        distanceBelow = d;
        if (grid[r][ci] >= height) {
          //console.log('BELOW: ', grid[r][ci], 'higher or equal');
          //console.log(d);
          break;
        }
        d++;
      }
      //console.log(distanceLeft, distanceRight, distanceAbove, distanceBelow);
      scenicScores.push(distanceLeft * distanceRight * distanceAbove * distanceBelow);
    }
  });
});

const partTwo = scenicScores.sort((a, b) => b - a)[0];
console.log('Part two: ', partTwo);
