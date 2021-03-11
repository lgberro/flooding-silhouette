const fs = require("fs");
const {max} = Math;

const AIR = "A";
const BRICK = "B";
const WATER = "W";

if (process.argv.length !== 3) return console.error("usage: node index.js {file path}");
const path = process.argv[2];

fs.readFile(path, "utf8", (error, file) => {
  if (error) return console.error(error);
  // For code cleanliness there is NO input file validation (come on, that's easy to do :)
  file
    .split("\n") // splitting lines
    .filter((string, line) => line && !(line % 2)) // getting only lines with silhouette
    .map(string => string.split(" ").map(n => +n)) // isolating and converting chars to numbers
    .forEach(input => {
      const width = input.length;
      const height = Math.max(...input);
      const array = input.map((bricks, x) => [...Array(bricks).fill(BRICK), ...Array(height - bricks).fill(AIR)]);
      let total = 0;

      const get = (x, y) => array[x][y];
      const set = (x, y, value = get(x, y)) => (array[x][y] = value);
      const setSolid = (x, y) => set(x, y, get(x, y) === BRICK ? BRICK : WATER);
      const setAir = (x, y) => set(x, y, get(x, y) === BRICK ? BRICK : AIR);
      const isSolid = (x, y) => [BRICK, WATER].includes(get(max(x, 0), max(y, 0)));
      const isAir = (x, y) => get(max(x, 0), max(y, 0)) === AIR;

      const update = (x, y, left = get(x, y)) => {
        const self = get(x, y);
        if (x === width - 1) return; // rightmost can't be water
        update(x + 1, y, self === BRICK ? BRICK : left); // recursing into right cell
        // now every right cells in this row are defined
        if (x === 0 || self === BRICK) return; // leftmost can't be water
        const isLeftAir = left === AIR; // left cell isn't defined yet
        const isLeftSolid = [BRICK, WATER].includes(left); // left cell isn't defined yet
        const isDownAir = isAir(x, y - 1);
        const isDownSolid = isSolid(x, y - 1);
        const isRightAir = isAir(x + 1, y);
        const isRightSolid = isSolid(x + 1, y);
        if (isLeftAir || isDownAir || isRightAir) setAir(x, y);
        if (isLeftSolid && isDownSolid && isRightSolid) ++total && setSolid(x, y);
      };

      for (let y = 0; y < height; y++) update(0, y);
      console.log(total);
    });
});
