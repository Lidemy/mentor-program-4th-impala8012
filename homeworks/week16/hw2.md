## 程式碼
```javascript
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

## 執行步驟
1. 宣告一個全域變數 i (因為變數的宣告不在 function 裡，因此此變數的宣告為全域變數)
2. 全域變數 i = 0，判斷 i < 5，進入迴圈，`console.log(i)` 放入 call stack
3. 輸出結果 0 ，並移除此 call stack
4. 遇到第一個 setTimeout 函式，放入 call stack，轉交由給 web API 處理，瀏覽器計時 0ms 結束後，放到 callback queue，直到所有 Call Stack 為空，再放回到 Call Stack 裡面執行
5. 第一圈迴圈執行完畢 i ++ 
6. 全域變數 i = 1，判斷 i < 5 進入迴圈，`console.log(i)` 放入 call stack
7. 輸出結果 1 ，並移除此 call stack
8. 遇到第二個 setTimeout 函式，放入 call stack，轉交由給 web API 處理，瀏覽器計時 (i * 1000) = 1000 ms 結束後，放到 callback queue，直到所有 Call Stack 為空，再放回到 Call Stack 裡面執行
9. 第二圈迴圈執行完畢 i ++ 
10. 全域變數 i = 2，判斷 i < 5 進入迴圈，`console.log(i)` 放入 call stack
11. 輸出結果 2 ，並移除此 call stack
12. 遇到第三個 setTimeout 函式，放入 call stack，轉交由給 web API 處理，瀏覽器計時 (i * 1000) = 2000 ms 結束後，放到 callback queue，直到所有 Call Stack 為空，再放回到 Call Stack 裡面執行
13. 第三圈迴圈執行完畢 i ++ 
14. 全域變數 i = 3，判斷 i < 5 進入迴圈，`console.log(i)` 放入 call stack
15. 輸出結果 3 ，並移除此 call stack
16. 遇到第四個 setTimeout 函式，放入 call stack，轉交由給 web API 處理，瀏覽器計時 (i * 1000) = 3000 ms 結束後，放到 callback queue，直到所有 Call Stack 為空，再放回到 Call Stack 裡面執行
17. 第四圈迴圈執行完畢 i ++ 
18. 全域變數 i = 4，判斷 i < 5 進入迴圈，`console.log(i)` 放入 call stack
19. 輸出結果 4 ，並移除此 call stack
20. 遇到第五個 setTimeout 函式，放入 call stack，轉交由給 web API 處理，瀏覽器計時 (i * 1000) = 4000 ms 結束後，放到 callback queue，直到所有 Call Stack 為空，再放回到 Call Stack 裡面執行
21. 第五圈迴圈執行完畢 i ++ 
22. 全域變數 i = 5，判斷 i < 5 沒有進入迴圈，目前 call stack 為空，處理之前 web api 處理完放置 callback queue 的 setTimeout 函式
23. 執行第一個 setTimeout(cb,0)，將`console.log(i)` 放入 call stack
24. 此時的全域變數 i = 5，輸出結果 5 
25. 執行第二個 setTimeout(cb,1000)，將`console.log(i)` 放入 call stack
26. 全域變數 i = 5，輸出結果 5 
27. 執行第三個 setTimeout(cb,2000)，將`console.log(i)` 放入 call stack
28. 全域變數 i = 5，輸出結果 5 
29. 執行第四個 setTimeout(cb,3000)，將`console.log(i)` 放入 call stack
30. 全域變數 i = 5，輸出結果 5 
31. 執行第五個 setTimeout(cb,4000)，將`console.log(i)` 放入 call stack
32. 全域變數 i = 5，輸出結果 5 

## 輸出結果
```
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5
```