import { load } from "./loader.js";

function calculateFuelByMass(mass) {
  return Math.floor(mass / 3) - 2;
}

async function solveFirst() {
  const lines = await load("1.txt");
  const res = lines.reduce((ac, v) => ac + calculateFuelByMass(v), 0);
  return res;
}

function calculateExtraFuel(fuel) {
  let res = 0;
  let extra = fuel;
  do {
    extra = calculateFuelByMass(extra);
    if (extra > 0) {
      res += extra;
    }
  } while (extra > 0);
  return res;
}

async function solveSecond() {
  const lines = await load("1.txt");
  const values = lines.map(v => {
    const fuel = calculateFuelByMass(v);
    return fuel + calculateExtraFuel(fuel);
  });
  const res = values.reduce((ac, v) => ac + v, 0);
  return res;
}

export { solveFirst, solveSecond };
