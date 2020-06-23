function search(arr, n) {
  let L = 0;
  let R = arr.length - 1;
  while (L <= R) {
    let M = Math.floor((L + R) / 2);
    if (n === arr[M]) {
      return M;
    } else if (n < arr[M]) {
      let R = M - 1;
    } else {
      L = M + 1;
    }
  }
  return -1;
}

console.log(search([1, 3, 10, 14, 39], 14));
console.log(search([1, 3, 10, 14, 39], 299));
