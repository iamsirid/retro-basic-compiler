const charToNum = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 10,
  K: 11,
  L: 12,
  M: 13,
  N: 14,
  O: 15,
  P: 16,
  Q: 17,
  R: 18,
  S: 19,
  T: 20,
  U: 21,
  V: 22,
  W: 23,
  X: 24,
  Y: 25,
  Z: 26,
  IF: 0,
  GOTO: null,
  PRINT: 0,
  STOP: 0,
  sum: 1,
  sub: 2,
  less: 3,
  eq: 4,
  eof: 0
};
const bcodeRule = {
  line: 10,
  id: 11,
  const: 12,
  if: 13,
  goto: 14,
  print: 15,
  stop: 16,
  line_num: 10,
  id: 11,
  IF: 13,
  PRINT: 15,
  GOTO: null,
  STOP: 16,
  const: 12,
  SUM: 17,
  SUB: 17,
  LESS: 17,
  EQ: 17,
  EOF: null
};

module.exports = {
  parse: tokens => {
    let bcodes = "";
    tokens.forEach(token => {
      if (token.value in charToNum) {
        token.value = charToNum[token.value];
      }
      bcodes =
        bcodeRule[token.name] != null
          ? bcodes.concat(" " + bcodeRule[token.name])
          : bcodes;
      bcodes = token.value != null ? bcodes.concat(" " + token.value) : bcodes;
    });

    bcodes = bcodes.slice(1);

    return bcodes;
  }
};
