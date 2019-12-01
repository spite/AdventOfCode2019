async function load(filename) {
  const res = await fetch(filename);
  const txt = await res.text();
  return txt.split("\n");
}

export { load };
