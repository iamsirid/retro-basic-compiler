const lexing = require("lexing");

const rules = [
  [
    /^$/,
    function(match) {
      return lexing.Token("EOF", null);
    }
  ],
  [
    /^\s+/,
    function(match) {
      return null;
    }
  ],
  [
    /^([1-9][0-9]{0,2}|1000)/,
    function(match) {
      return lexing.Token("line_num", match[0]);
    }
  ],
  [
    /^([1-9]?[0-9]{1}|100)/,
    function(match) {
      return lexing.Token("const", match[0]);
    }
  ],
  [
    /^IF/,
    function(match) {
      return lexing.Token("IF", match[0]);
    }
  ],
  [
    /^GOTO/,
    function(match) {
      return lexing.Token("GOTO", match[0]);
    }
  ],
  [
    /^PRINT/,
    function(match) {
      return lexing.Token("PRINT", match[0]);
    }
  ],
  [
    /^STOP/,
    function(match) {
      return lexing.Token("STOP", match[0]);
    }
  ],
  [
    /^\+/,
    function(match) {
      return lexing.Token("SUM", "sum");
    }
  ],
  [
    /^\-/,
    function(match) {
      return lexing.Token("SUB", "sub");
    }
  ],
  [
    /^\</,
    function(match) {
      return lexing.Token("LESS", "less");
    }
  ],
  [
    /^\=/,
    function(match) {
      return lexing.Token("EQ", "eq");
    }
  ],
  [
    /^[A-Z]/,
    function(match) {
      return lexing.Token("id", match[0]);
    }
  ]
];

var tokenizer = new lexing.Tokenizer(rules);

function tokenize(stringInput) {}

module.exports = {
  tokenize: stringInput => {
    const tokens = [];
    const input = new lexing.StringIterator(stringInput);
    const output = tokenizer.map(input);

    while (true) {
      var token = output.next();
      tokens.push(token);
      if (token.name === "EOF") {
        token.value = "eof";
        break;
      }
    }

    tokens.forEach((t, i) => {
      if (i != 0 && tokens[i - 1].name == "line_num" && t.name == "line_num") {
        tokens[i - 1].name = "goto";
      }

      if (
        i != 0 &&
        ["EQ", "SUM", "LESS", "SUB", "IF"].indexOf(tokens[i - 1].name) > -1 &&
        t.name == "line_num"
      ) {
        t.name = "const";
      }
    });

    return tokens;
  }
};
