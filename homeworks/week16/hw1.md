## 程式碼
```javascript
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```

## 執行步驟
1. `console.log(1)` 放入 call stack，執行`console.log(1)`，印出 1，然後離開 call stack
2. 遇到 setTimeout 函式，放入 call stack，轉交由給 web API 處理，瀏覽器計時 0ms 結束後，放到 callback queue，直到所有 call stack 為空，再放回到 call stack 裡面執行
3. `console.log(3)` 放入 call stack，執行`console.log(3)`，印出 3，然後離開 call stack
4. 遇到 setTimeout 函式，放入 call stack，轉交由給 web API 處理，瀏覽器計時 0ms 結束後，放到 callback queue，直到所有 call stack 為空，再放回到 call stack 裡面執行
5. `console.log(5)` 放入 call stack，執行`console.log(5)`，印出 5，然後離開 call stack
6. 目前 call stack 為空，把之前放入 callback queue 的第一個 setTimeout 函式，放到 call stack，執行 `console.log(2)`，印出 2，離開 call stack
7. 目前 call stack 為空，把之前放入 callback queue 的第二個 setTimeout 函式，放到 call stack，執行 `console.log(4)`，印出 4，離開 call stack
8. call stack 和 callback queue 都為空，程式執行完畢

## 輸出結果
```
1
3
5
2
4
```