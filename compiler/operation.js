const lexer = require("./lexer");
const parser = require("./parser");
// const readline = require("readline");

// process.stdin.on("data", function(data) {
//   console.log(data.toString());
// });

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// rl.question("Input:: ", strIn => {
//   rl.close();

//   operation(strIn);
// });

module.exports = {
  operate: strIn => {
    const tokens = lexer.tokenize(strIn);

    // tokens.forEach(t => {
    //   console.log(t);
    // });

    return parser.parse(tokens);
  }
};
