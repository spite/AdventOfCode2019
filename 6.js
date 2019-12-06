import { load } from "./loader.js";

function findNode(tree, node) {}

function buildTree(input) {
  const nodes = new Map();
  for (const line of input) {
    if (line) {
      const [a, b] = line.split(")");
      let parent = nodes.get(a);
      if (!parent) {
        parent = { name: a, children: [], parent: null };
        nodes.set(a, parent);
      }
      let n = nodes.get(b);
      if (!n) {
        n = { name: b, children: [], parent };
        nodes.set(b, n);
      }
      n.parent = parent;
      parent.children.push(n);
    }
  }
  return nodes;
}

async function solveFirst() {
  //   const input = `COM)B
  // B)C
  // C)D
  // D)E
  // E)F
  // B)G
  // G)H
  // D)I
  // E)J
  // J)K
  // K)L`.split("\n");
  const input = await load("./6.txt");
  const nodes = buildTree(input);
  let total = 0;
  for (const node of nodes.values()) {
    let parent = node.parent;
    let orbits = 0;
    if (parent) {
      do {
        orbits++;
        parent = parent.parent;
      } while (parent);
    }
    total += orbits;
  }
  return total;
}

function getPath(a, b) {
  const path = [a];
  const node = a;
  let parent = node.parent;
  let str = node.name;
  if (parent) {
    do {
      path.push(parent);
      str += ` ${parent.name}`;
      parent = parent.parent;
    } while (parent);
  }
  console.log(str);
  return path;
}

async function solveSecond() {
  const input = await load("./6.txt");
  //   const input = `COM)B
  // B)C
  // C)D
  // D)E
  // E)F
  // B)G
  // G)H
  // D)I
  // E)J
  // J)K
  // K)L
  // K)YOU
  // I)SAN`.split("\n");
  const nodes = buildTree(input);
  const you = getPath(nodes.get("YOU"), nodes.get("COM"));
  const santa = getPath(nodes.get("SAN"), nodes.get("COM"));
  const path = {};
  const v = [...you.values(), ...santa.values()];
  for (const n of v) {
    if (!path[n.name]) {
      path[n.name] = 0;
    }
    path[n.name]++;
  }
  return Object.values(path).filter(v => v === 1).length - 2;
}

export { solveFirst, solveSecond };
