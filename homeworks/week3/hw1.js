const readline = require('readline');

function solve(lines) {
  const n = lines[0];
  for (let i = 1; i <= n; i += 1) {
    let str = '';
    for (let j = 1; j <= i; j += 1) {
      str += '*';
    }
    console.log(str);
  }
}

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

rl.on('close', () => {
  solve(lines);
});
