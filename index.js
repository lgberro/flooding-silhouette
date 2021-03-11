const AIR = "A";
const BRICK = "B";
const WATER = "W";

const input = [7, 10, 2, 5, 13, 3, 4, 1, 5, 9];
const width = input.length;
const height = Math.max(...input);
const array = input.map((bricks, x) => [...Array(bricks).fill(BRICK), ...Array(height - bricks).fill(AIR)]);
let total = 0;

const get = (x, y) => array[x][y];

const set = (x, y, value = get(x, y)) => (array[x][y] = value);

const setSolid = (x, y) => set(x, y, get(x, y) === BRICK ? BRICK : WATER);

const setAir = (x, y) => set(x, y, get(x, y) === BRICK ? BRICK : AIR);

const isSolid = (x, y) => [BRICK, WATER].includes(get(Math.max(x, 0), Math.max(y, 0)));

const isAir = (x, y) => get(Math.max(x, 0), Math.max(y, 0)) === AIR;

function update(x, y, left = get(x, y)) {
  const self = get(x, y);

  if (x === width - 1) return; // rightmost can't be water

  update(x + 1, y, self === BRICK ? BRICK : left); // recursing into right cell

  // now every right cells in the row are defined
  const isLeftAir = left === AIR; // left cell isn't defined yet
  const isLeftSolid = [BRICK, WATER].includes(left); // left cell isn't defined yet
  const isDownAir = isAir(x, y - 1);
  const isDownSolid = isSolid(x, y - 1);
  const isRightAir = isAir(x + 1, y);
  const isRightSolid = isSolid(x + 1, y);

  if (x === 0) return self; // leftmost can't be water
  if (isLeftAir || isDownAir || isRightAir) setAir(x, y);
  if (isLeftSolid && isDownSolid && isRightSolid) ++total && setSolid(x, y);
}

for (let y = 0; y < height; y++) {
  console.log(total);
  update(0, y);
}

array.forEach(x => console.log(...x));
console.log(`Total flooded: ${total}`);
