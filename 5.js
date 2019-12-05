import { load } from "./loader.js";

function getMode(value, position) {
  if (value < 100) {
    return 0;
  }
  const bits = Math.floor(value / 100);
  return (bits & (10 ** position)) / 10 ** position;
}

function getParameter(program, ptr, mode) {
  if (mode === 1) {
    return program[ptr];
  } else {
    return program[program[ptr]];
  }
}

function setParameter(program, ptr, mode, v) {
  if (mode === 1) {
    program[ptr] = v;
  } else {
    program[program[ptr]] = v;
  }
}

function add(program, ptr) {
  const a = getParameter(program, ptr + 1, getMode(program[ptr], 0));
  const b = getParameter(program, ptr + 2, getMode(program[ptr], 1));
  setParameter(program, ptr + 3, getMode(program[ptr], 2), a + b);
  return ptr + 4;
}

function mul(program, ptr) {
  const a = getParameter(program, ptr + 1, getMode(program[ptr], 0));
  const b = getParameter(program, ptr + 2, getMode(program[ptr], 1));
  setParameter(program, ptr + 3, getMode(program[ptr], 2), a * b);
  return ptr + 4;
}

function input(program, ptr, v) {
  setParameter(program, ptr + 1, getMode(program[ptr], 0), v);
  return ptr + 2;
}

function output(program, ptr) {
  const v = getParameter(program, ptr + 1, getMode(program[ptr], 0));
  console.log("OUTPUT", v);
  return ptr + 2;
}

function jumpIfTrue(program, ptr) {
  const a = getParameter(program, ptr + 1, getMode(program[ptr], 0));
  const b = getParameter(program, ptr + 2, getMode(program[ptr], 1));
  if (a !== 0) return b;
  return ptr + 3;
}

function jumpIfFalse(program, ptr) {
  const a = getParameter(program, ptr + 1, getMode(program[ptr], 0));
  const b = getParameter(program, ptr + 2, getMode(program[ptr], 1));
  if (a === 0) return b;
  return ptr + 3;
}

function lessThan(program, ptr) {
  const a = getParameter(program, ptr + 1, getMode(program[ptr], 0));
  const b = getParameter(program, ptr + 2, getMode(program[ptr], 1));
  setParameter(program, ptr + 3, getMode(program[ptr], 2), a < b ? 1 : 0);
  return ptr + 4;
}

function equals(program, ptr) {
  const a = getParameter(program, ptr + 1, getMode(program[ptr], 0));
  const b = getParameter(program, ptr + 2, getMode(program[ptr], 1));
  setParameter(program, ptr + 3, getMode(program[ptr], 2), a === b ? 1 : 0);
  return ptr + 4;
}

function getOpCode(program, ptr) {
  let opcode = program[ptr];
  if (opcode >= 100) {
    opcode = opcode % 100;
  }
  return opcode;
}

function run(program, i) {
  let ptr = 0;
  let end = false;
  console.log(program);
  do {
    //console.log(program.toString());
    let opcode = getOpCode(program, ptr);
    console.log(opcode);
    switch (opcode) {
      case 1:
        ptr = add(program, ptr);
        break;
      case 2:
        ptr = mul(program, ptr);
        break;
      case 3:
        ptr = input(program, ptr, i);
        break;
      case 4:
        ptr = output(program, ptr);
        break;
      case 5:
        ptr = jumpIfTrue(program, ptr);
        break;
      case 6:
        ptr = jumpIfFalse(program, ptr);
        break;
      case 7:
        ptr = lessThan(program, ptr);
        break;
      case 8:
        ptr = equals(program, ptr);
        break;
      case 99:
        end = true;
        break;
      default:
        debugger;
        end = true;
    }
  } while (!end);
  return program;
}

async function solveFirst() {
  return;
  // console.log(run([1002, 4, 3, 4, 33]));
  // console.log(run([1101, 100, -1, 4, 0]));
  // return;
  const input = await load("5.txt");
  const program = input[0].split(",").map(v => parseInt(v, 10));
  return run(program)[0];
}

async function solveSecond() {
  //console.log(run([3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8], 7));
  //console.log(run([3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8]));
  //console.log(run([3, 3, 1108, -1, 8, 3, 4, 3, 99]));
  //console.log(run([3, 3, 1107, -1, 8, 3, 4, 3, 99]));
  //console.log(run([3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9]));
  //console.log(run([3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1]));
  /*console.log(
    run(
      [
        3,
        21,
        1008,
        21,
        8,
        20,
        1005,
        20,
        22,
        107,
        8,
        21,
        20,
        1006,
        20,
        31,
        1106,
        0,
        36,
        98,
        0,
        0,
        1002,
        21,
        125,
        20,
        4,
        20,
        1105,
        1,
        46,
        104,
        999,
        1105,
        1,
        46,
        1101,
        1000,
        1,
        20,
        4,
        20,
        1105,
        1,
        46,
        98,
        99
      ],
      10
    )
  );
  return;*/
  const input = await load("5.txt");
  const program = input[0].split(",").map(v => parseInt(v, 10));
  return run(program, 5)[0];
}

export { solveFirst, solveSecond };
