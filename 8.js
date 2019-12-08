import { load } from "./loader.js";

function extractLayers(input, width, height) {
  const l = width * height;
  const layers = [];
  for (let ptr = 0; ptr < input.length; ptr += l) {
    const layer = input.substr(ptr, l);
    layers.push(layer);
  }
  return layers;
}

async function solveFirst() {
  const input = await load("./8.txt");
  const layers = extractLayers(input[0], 25, 6);
  const zeroes = layers
    .map(l => Array.from(l).reduce((ac, v) => (v === "0" ? ac + 1 : ac), 0))
    .map((v, i) => {
      return {
        id: parseInt(i, 10),
        v
      };
    })
    .sort((a, b) => a.v - b.v);
  const layer = layers[zeroes[0].id];
  const ones = Array.from(layer).reduce(
    (ac, v) => (v === "1" ? ac + 1 : ac),
    0
  );
  const twos = Array.from(layer).reduce(
    (ac, v) => (v === "2" ? ac + 1 : ac),
    0
  );
  return ones * twos;
}

async function solveSecond() {
  const w = 25;
  const h = 6;
  const input = await load("./8.txt");
  const layers = extractLayers(input[0], w, h);
  //   const w = 2;
  //   const h = 2;
  //   const layers = extractLayers("0222112222120000", w, h);
  let ptr = 0;
  for (let y = 0; y < h; y++) {
    let str = "";
    for (let x = 0; x < w; x++) {
      for (let j = 0; j < layers.length; j++) {
        const v = layers[j][ptr];
        switch (v) {
          case "0":
            j = layers.length;
            str += "█";
            continue;
          case "1":
            j = layers.length;
            str += " ";
            continue;
          case "2": // transparent
            break;
          default:
            debugger;
        }
      }
      ptr++;
    }
    console.log(str);
  }
}

export { solveFirst, solveSecond };
