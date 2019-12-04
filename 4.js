function hasTwoAdjacent(input) {
  for (let i = 1; i < input.length; i++) {
    if (input[i] === input[i - 1]) {
      return true;
    }
  }
  // console.log('no adjacent pair')
  return false;
}

function hasExactlyTwoAdjacent(input) {
  let cur = input[0];
  let entries = [];
  let count = 1;
  for (let i = 1; i < input.length; i++) {
    if (input[i] !== cur) {
      entries.push({ num: cur, count });
      count = 1;
      cur = input[i];
    } else {
      count++;
    }
  }
  entries.push({ num: cur, count });
  const res = entries.filter(v => v.count === 2);
  return res.length > 0;
  // console.log('no adjacent pair')
  return false;
}

function neverDecreases(input) {
  for (let i = 1; i < input.length; i++) {
    if (input[i] < input[i - 1]) {
      //    console.log('decreases');
      return false;
    }
  }
  return true;
}

function checkPassword(input) {
  const sequence = Array.from(input.toString()).map(v => parseInt(v, 10));
  //  console.log(sequence);
  return hasTwoAdjacent(sequence) && neverDecreases(sequence);
}

function checkPassword2(input) {
  const sequence = Array.from(input.toString()).map(v => parseInt(v, 10));
  //  console.log(sequence);
  const res = hasExactlyTwoAdjacent(sequence) && neverDecreases(sequence);
  // console.log(input, res);
  return res;
}

function solveFirst() {
  checkPassword(111111);
  checkPassword(223450);
  checkPassword(123789);

  let total = 0;
  for (let i = 156218; i < 652527; i++) {
    if (checkPassword(i)) {
      total++;
    }
  }
  return total;
}

function solveSecond() {
  checkPassword2(112233);
  checkPassword2(123444);
  checkPassword2(111122);

  let total = 0;
  for (let i = 156218; i < 652527; i++) {
    if (checkPassword2(i)) {
      total++;
    }
  }
  return total;
}

export { solveFirst, solveSecond };
