import { load } from "./loader.js";

function add(program, ptr) {
  const ptrA = program[ptr + 1];
  const ptrB = program[ptr + 2];
  const ptrOut = program[ptr + 3];
  const a = program[ptrA];
  const b = program[ptrB];
  program[ptrOut] = a + b;
  //console.log(`${ptr} ${ptrOut}=${ptrA}+${ptrB}`);
}

function mul(program, ptr) {
  const ptrA = program[ptr + 1];
  const ptrB = program[ptr + 2];
  const ptrOut = program[ptr + 3];
  const a = program[ptrA];
  const b = program[ptrB];
  program[ptrOut] = a * b;
  // console.log(`${ptr} ${ptrOut}=${ptrA}*${ptrB}`);
}

function run(program) {
  let ptr = 0;
  let end = false;
  do {
    const opcode = program[ptr];
    switch (opcode) {
      case 1:
        add(program, ptr);
        ptr += 4;
        break;
      case 2:
        mul(program, ptr);
        ptr += 4;
        break;
      case 99:
        end = true;
        break;
    }
  } while (!end);
  return program;
}

async function solveFirst() {
  /*console.log(run([1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50]));
  console.log(run([1, 0, 0, 0, 99]));
  console.log(run([2, 3, 0, 3, 99]));
  console.log(run([2, 4, 4, 5, 99, 0]));
  console.log(run([1, 1, 1, 4, 99, 5, 6, 0, 99]));*/
  const input = await load("2.txt");
  const program = input[0].split(",").map(v => parseInt(v, 10));
  program[1] = 12;
  program[2] = 2;
  return run(program)[0];
}

async function solveSecond() {
  const input = await load("2.txt");
  const program = input[0].split(",").map(v => parseInt(v, 10));
  program[1] = 12;
  program[2] = 2;
  for (let noun = 0; noun < 99; noun++) {
    for (let verb = 0; verb < 99; verb++) {
      const test = program.slice();
      test[1] = noun;
      test[2] = verb;
      const res = run(test)[0];
      if (res === 19690720) {
        return 100 * noun + verb;
      }
    }
  }
}

export { solveFirst, solveSecond };
