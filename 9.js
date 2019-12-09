import { load } from "./loader.js";
import { run } from "./intcode.js";

async function solveFirst() {
  // return run(
  //   [109, 1, 204, -1, 1001, 100, 1, 100, 1008, 100, 16, 101, 1006, 101, 0, 99],
  //   0
  // );
  //return run([1102, 34915192, 34915192, 7, 4, 7, 99, 0], 0);
  //return run([104, 1125899906842624, 99], 0);
  const file = await load("./9.txt");
  const program = file[0].split(",").map(v => parseInt(v, 10));
  return run(program, 1);
}

async function solveSecond() {
  const file = await load("./9.txt");
  const program = file[0].split(",").map(v => parseInt(v, 10));
  return run(program, 2);
}

export { solveFirst, solveSecond };
