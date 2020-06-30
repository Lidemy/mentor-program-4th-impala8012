const readline = require('readline');

function isPrime(n) {
  if (n === 1) return false;
  for (let i = 2; i < n; i += 1) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

function solve(lines) {
  for (let i = 1; i < lines.length; i += 1) {
    if (isPrime(Number(lines[i]))) {
      console.log('Prime');
    } else {
      console.log('Composite');
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
