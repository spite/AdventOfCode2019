async function loadModule() {
  const num = window.location.hash.substr(1) || 1;
  const solution = await import(`./${num}.js`);
  return solution;
}

async function init() {
  const solution = await loadModule();
  const firstResults = await solution.solveFirst();
  console.log(firstResults);
  const secondResult = await solution.solveSecond();
  console.log(secondResult);
}

window.addEventListener("load", init);
