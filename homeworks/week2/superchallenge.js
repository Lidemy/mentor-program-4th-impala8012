function add(a, b) {
  if (b === 0) return a;
  let sum = a ^ b; // 位元未進位相加
  let carry = (a & b) << 1; //位元進位
  return add(sum, carry);
}
