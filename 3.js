import { load } from "./loader.js";

function splitPathIntoLines(path) {
  const steps = path.split(",");
  const lines = [];
  const p = { x: 0, y: 0 };
  let hops = 0;
  for (const step of steps) {
    const n = { x: p.x, y: p.y };
    const direction = step.substr(0, 1);
    const distance = parseInt(step.substr(1), 10);
    switch (direction) {
      case "U":
        n.y += distance;
        break;
      case "D":
        n.y -= distance;
        break;
      case "L":
        n.x -= distance;
        break;
      case "R":
        n.x += distance;
        break;
    }
    lines.push({ x0: p.x, y0: p.y, x1: n.x, y1: n.y, hops });
    hops += Math.abs(n.x - p.x) + Math.abs(n.y - p.y);
    p.x = n.x;
    p.y = n.y;
  }
  return lines;
}

function turnLineToPoints(line) {
  const points = [];
  if (line.y0 === line.y1) {
    const step = Math.sign(line.x1 - line.x0);
    let hops = line.hops;
    for (let x = line.x0; x !== line.x1; x += step) {
      points.push({ x, y: line.y0, hops });
      hops++;
    }
  } else {
    const step = Math.sign(line.y1 - line.y0);
    let hops = line.hops;
    for (let y = line.y0; y !== line.y1; y += step) {
      points.push({ x: line.x0, y, hops });
      hops++;
    }
  }
  return points;
}

function findIntersection(lines1, lines2) {
  const points1 = lines1.flatMap(l => turnLineToPoints(l));
  const points2 = lines2.flatMap(l => turnLineToPoints(l));

  const map = new Map();
  for (const point of points1) {
    const key = `${point.x}:${point.y}`;
    if (!map.get(key)) {
      map.set(key, {
        x: point.x,
        y: point.y,
        a: true,
        b: false,
        hopsA: point.hops
      });
    }
  }
  for (const point of points2) {
    const key = `${point.x}:${point.y}`;
    if (!map.get(key)) {
      map.set(key, {
        x: point.x,
        y: point.y,
        a: false,
        b: true,
        hopsB: point.hops
      });
    } else {
      const v = map.get(key);
      v.b = true;
      v.hopsB = point.hops;
      map.set(key, v);
    }
  }

  const intersections = Array.from(map.values()).filter(v => v.a && v.b);
  intersections.forEach(v => (v.distance = Math.abs(v.x) + Math.abs(v.y)));
  intersections.forEach(v => (v.hops = v.hopsA + v.hopsB));

  const canvas = document.createElement("canvas");
  canvas.width = 1000;
  canvas.height = 1000;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  const scale = 2;
  ctx.translate(0.5 * canvas.width, 0.5 * canvas.height);
  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.moveTo(0, 0);
  for (const line of lines1) {
    ctx.lineTo(line.x1 * scale, line.y1 * scale);
  }
  ctx.stroke();
  ctx.beginPath();
  ctx.strokeStyle = "blue";
  ctx.moveTo(0, 0);
  for (const line of lines2) {
    ctx.lineTo(line.x1 * scale, line.y1 * scale);
  }
  ctx.stroke();

  for (const i of intersections) {
    ctx.beginPath();
    ctx.arc(i.x * scale, i.y * scale, 0.5 * scale, 0, 2 * Math.PI);
    ctx.stroke();
  }

  const final = intersections
    .filter(v => v.distance !== 0)
    .sort((a, b) => a.distance - b.distance);
  const final2 = intersections
    .filter(v => v.distance !== 0)
    .sort((a, b) => a.hops - b.hops);
  console.log(final2[0].hops);

  ctx.beginPath();
  ctx.arc(0, 0, scale, 0, 2 * Math.PI);
  ctx.stroke();
  const f = final[0];
  ctx.beginPath();
  ctx.arc(f.x * scale, f.y * scale, 1 * scale, 0, 2 * Math.PI);
  ctx.stroke();
  return final[0].distance;
}

function findClosestIntersection(path1, path2) {
  const lines1 = splitPathIntoLines(path1);
  const lines2 = splitPathIntoLines(path2);
  return findIntersection(lines1, lines2);
}

async function solveFirst() {
  return;
  const res1 = findClosestIntersection("R8,U5,L5,D3", "U7,R6,D4,L4");
  const res2 = findClosestIntersection(
    "R75,D30,R83,U83,L12,D49,R71,U7,L72",
    "U62,R66,U55,R34,D71,R55,D58,R83"
  );
  const res3 = findClosestIntersection(
    "R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51",
    "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7"
  );
  const lines = await load("./3.txt");
  findClosestIntersection(lines[0], lines[1]);
}

async function solveSecond() {
  const res1 = findClosestIntersection("R8,U5,L5,D3", "U7,R6,D4,L4");
  const res2 = findClosestIntersection(
    "R75,D30,R83,U83,L12,D49,R71,U7,L72",
    "U62,R66,U55,R34,D71,R55,D58,R83"
  );
  const res3 = findClosestIntersection(
    "R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51",
    "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7"
  );
  const lines = await load("./3.txt");
  findClosestIntersection(lines[0], lines[1]);
}

export { solveFirst, solveSecond };
