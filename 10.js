import { load } from "./loader.js";

function turnInputToMap(input) {
  const asteroids = [];
  for (let y = 0; y < input.length; y++) {
    const line = input[y];
    for (let x = 0; x < line.length; x++) {
      if (line[x] === "#") {
        asteroids.push({ x, y, id: asteroids.length });
      }
    }
  }
  return asteroids;
}

function length(vector) {
  return Math.sqrt(vector.x ** 2 + vector.y ** 2);
}

function normalize(vector) {
  const l = length(vector);
  vector.x /= l;
  vector.y /= l;
  if (l === 0) {
    vector.x = 0;
    vector.y = 0;
  }
}

function dot(a, b) {
  return a.x * b.x + a.y * b.y;
}

function intersect(ray, asteroids) {
  normalize(ray.direction);
  let intersections = [];
  for (const a of asteroids) {
    const dx = a.x - ray.origin.x;
    const dy = a.y - ray.origin.y;
    const d = { x: dx, y: dy };
    const distance = length(d);
    if (distance) {
      normalize(d);
      const res = dot(d, ray.direction);
      if (res === 1) {
        intersections.push({
          asteroid: a,
          distance
        });
      }
      //console.log(ray.origin, ray.direction, a, res, length(d));
    }
  }
  console.log(
    `(${ray.origin.x}, ${ray.origin.y}) -> (${ray.direction.x}, ${ray.direction.y}) :: ${intersections.length}`
  );
  return intersections;
}

// function calculateLineOfSight(asteroid, asteroids) {
//   const ray = {
//     origin: { x: 0, y: 0 },
//     direction: { x: 0, y: 0 }
//   };

//   let count = 0;
//   for (const a of asteroids) {
//     ray.origin.x = asteroid.x;
//     ray.origin.y = asteroid.y;
//     if (a !== asteroid) {
//       ray.direction.x = a.x - asteroid.x;
//       ray.direction.y = a.y - asteroid.y;
//       const res = intersect(ray, asteroids);
//       if (res.length) {
//         count++;
//       }
//     }
//   }
//   console.log(asteroid, count);
// }

function calculateLineOfSight(asteroid, asteroids) {
  const map = new Map();
  for (const a of asteroids) {
    if (a !== asteroid) {
      const dx = asteroid.x - a.x;
      const dy = asteroid.y - a.y;
      const alpha = Math.atan2(dy, dx);
      const d = Math.sqrt(dx ** 2 + dy ** 2);
      if (!map.get(alpha)) {
        map.set(alpha, []);
      }
      map.get(alpha).push({ asteroid: a, distance: d });
    }
  }
  for (const m of map) {
    m[1].sort((a, b) => a.distance - b.distance);
  }
  return map;
}

function processMap1(input) {
  const asteroids = turnInputToMap(input);
  const d = [];
  for (const a of asteroids) {
    const res = calculateLineOfSight(a, asteroids);
    d.push({ asteroid: a, d: res });
  }
  d.sort((a, b) => b.d.size - a.d.size);
  return d;
}

async function solveFirst() {
  return;
  //   return processMap1(
  //     `.#..#
  // .....
  // #####
  // ....#
  // ...##`.split("\n")
  //   );
  //   return processMap1(
  //     `......#.#.
  // #..#.#....
  // ..#######.
  // .#.#.###..
  // .#..#.....
  // ..#....#.#
  // #..#....#.
  // .##.#..###
  // ##...#..#.
  // .#....####`.split("\n")
  //   );
  //   return processMap1(
  //     `#.#...#.#.
  // .###....#.
  // .#....#...
  // ##.#.#.#.#
  // ....#.#.#.
  // .##..###.#
  // ..#...##..
  // ..##....##
  // ......#...
  // .####.###.`.split("\n")
  //   );
  //   return processMap1(
  //     `.#..#..###
  // ####.###.#
  // ....###.#.
  // ..###.##.#
  // ##.##.#.#.
  // ....###..#
  // ..#.#..#.#
  // #..#.#.###
  // .##...##.#
  // .....#.#..`.split("\n")
  //   );
  //   return processMap1(
  //     `.#..##.###...#######
  // ##.############..##.
  // .#.######.########.#
  // .###.#######.####.#.
  // #####.##.#.##.###.##
  // ..#####..#.#########
  // ####################
  // #.####....###.#.#.##
  // ##.#################
  // #####.##.###..####..
  // ..######..##.#######
  // ####.##.####...##..#
  // .#####..#.######.###
  // ##...#.##########...
  // #.##########.#######
  // .####.#.###.###.#.##
  // ....##.##.###..#####
  // .#.#.###########.###
  // #.#.#.#####.####.###
  // ###.##.####.##.#..##`.split("\n")
  //   );
  return;
  const file = await load("./10.txt");
  return processMap1(file)[0];
}

function processMap2(input) {
  const asteroids = turnInputToMap(input);
  const d = [];
  for (const a of asteroids) {
    const res = calculateLineOfSight(a, asteroids);
    d.push({ asteroid: a, d: res });
  }
  return d;
}

async function solveSecond() {
  const file = await load("./10.txt");
  //   const file = `.#....#####...#..
  // ##...##.#####..##
  // ##...#...#.#####.
  // ..#.....#...###..
  // ..#.#.....#....##`.split("\n");
  //   const file = `.#..##.###...#######
  // ##.############..##.
  // .#.######.########.#
  // .###.#######.####.#.
  // #####.##.#.##.###.##
  // ..#####..#.#########
  // ####################
  // #.####....###.#.#.##
  // ##.#################
  // #####.##.###..####..
  // ..######..##.#######
  // ####.##.####...##..#
  // .#####..#.######.###
  // ##...#.##########...
  // #.##########.#######
  // .####.#.###.###.#.##
  // ....##.##.###..#####
  // .#.#.###########.###
  // #.#.#.#####.####.###
  // ###.##.####.##.#..##`.split("\n");
  const asteroids = turnInputToMap(file);
  const center = processMap1(file)[0];
  const res = calculateLineOfSight(center.asteroid, asteroids);
  const angles = [];
  Array.from(res.entries()).forEach(v =>
    angles.push({
      angle: (v[0] - Math.PI / 2 + 2 * Math.PI) % (2 * Math.PI),
      value: v[1]
    })
  );
  angles.sort((a, b) => a.angle - b.angle);
  let count = 1;
  for (const a of angles) {
    const p = a.value.shift();
    console.log(count, `${p.asteroid.x}, ${p.asteroid.y}`);
    count++;
  }
  debugger;
}

export { solveFirst, solveSecond };
