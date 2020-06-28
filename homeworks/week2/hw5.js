function join(arr, concatStr) {
  let ans = arr[0];
  if (ans === "") return str;
  for (let i = 1; i < arr.length; i++) {
    ans += concatStr + arr[i];
  }
  return ans;
}

function repeat(str, times) {
  let ans = "";
  for (let i = 1; i <= times; i++) {
    ans += str;
  }
  return ans;
}

console.log(join(["a"], "!"));
console.log(repeat("a", 5));
