// 內建函式解法
function capitalize(str) {
  if (str[0] >= "a" && str[0] <= "z") {
    return str.charAt(0).toUpperCase() + str.slice(1);
  } else {
    return str;
  }
}

//ASCII Code解法
function capitalize(str) {
  let ans = "";
  let code = str.charCodeAt(0);
  if (str[0] >= "a" && str[0] <= "z") {
    ans = String.fromCharCode(code - 32);
    for (let i = 1; i < str.length; i++) {
      ans += str[i];
    }
    return ans;
  } else {
    return str;
  }
}

console.log(capitalize("hello"));
