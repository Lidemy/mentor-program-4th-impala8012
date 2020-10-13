## 程式碼
```javascript
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```

## this 
1. 在物件導向中，this 所指的是自己的 instance
2. 在非物件導向中
  - 嚴格模式('use strict'): this 值為`undefined`
  - 非嚴格模式下，根據 runtime 會輸出不一樣的結果
  a. 瀏覽器下 ：`window`
  b. node.js 下：`global`
3. 物件中的 this 能夠透過`call`、`apply`、`bind `來更改 this 的值

## 執行步驟
1. `obj.inner.hello()` 可以看成 `obj.inner.hello.call(obj.inner)` 因此輸出 2

2. `obj2.hello()` 可以轉成 `obj.inner.hello.call(obj.inner)`，與上題一樣，輸出結果為 2

```javascript
const obj2 = {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
}
```

3. `hello()` 利用轉換方式變成 `hello.call()`，由於 hello 前面沒有東西，會呼叫全域物件，在嚴格模式下會輸出 `undefined`

```javascript
const hello = function() {
      console.log(this.value)
    }
```

## 輸出結果
```
2
2
undefined
```