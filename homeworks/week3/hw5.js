/* global BigInt */
const readline = require('readline');

function solve(lines) {
  const arr = [];
  for (let i = 1; i < lines.length; i += 1) {
    arr.push(lines[i].split(' '));
  }
  for (let i = 0; i < arr.length; i += 1) {
    const A = BigInt(arr[i][0]);
    const B = BigInt(arr[i][1]);
    const K = Number(arr[i][2]);

    if (A === B) {
      console.log('DRAW');
    } else if (K === 1) {
      if (A > B) {
        console.log('A');
      } else {
        console.log('B');
      }
    } else if (K === -1) {
      if (A < B) {
        console.log('A');
      } else {
        console.log('B');
      }
    }
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
