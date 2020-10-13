## 程式碼
```javascript
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```

## 執行步驟

1. 初始化 globalEC 以及 scopeChain
```javascript
globalEC: {
  VO: {
    a: undefined,
    fn: function,
    fn2: undefined,
  },
  scopeChain: [globalEC.VO]
}
```

2. 執行 globalEC 
```javascript
globalEC: {
  VO: {
    a: 1,
    fn:function,
    fn2: undefined,
    },
    scopeChain: [globalEC.VO]
}

fn.[[Scope]] = [globalEC.VO]
```

3. 呼叫 fn()，fnEC 初始化
```javascript
fnEC:{
  AO :{
    a: undefined,
    fn2:function
  },
  scopeChain: [fnEC.AO, fn.[[Scope]]]
  = [fnEC.AO, globalEC.VO]
}

fn2.[[Scope]] = [fnEC.scopeChain]
= [fnEC.AO, globalEC.VO]

globalEC: {
  VO: {
    a: 1,
    fn:function,
    fn2:undefined
  },
  scopeChain: [globalEC.VO]
}
```

這邊遇到的第一個 `console.log(a)` 會輸出 undefined

4. 執行 fnEC，a 賦值 5
```javascript
fnEC:{
  AO :{
    a: 5,
    fn2:function
  },
  scopeChain:[fnEC.AO, globalEC.VO]
}

fn2.[[Scope]] = [fnEC.scopeChain]
= [fnEC.AO, globalEC.VO]

globalEC: {
  VO: {
    a: 1,
    fn:function,
    fn2:function
  },
  scopeChain: [globalEC.VO]
}
```

這邊遇到的第二個 `console.log(a)` 會輸出 5

5. 執行 fnEC, a++
```javascript
fnEC:{
  AO :{
    a: 6,
    fn2:function
  },
  scopeChain: [fnEC.AO, globalEC.VO]
}

fn2.[[Scope]] = [fnEC.scopeChain]
= [fnEC.AO, globalEC.VO]

globalEC: {
  VO: {
    a: 1,
    fn:function,
    fn2:undefined
  },
  scopeChain: [globalEC.VO]
}
```

重新宣告變數 a，但在 `fn().AO` 已有該變數，所以可以跳過

6. 初始化 fn2EC
```javascript
fn2EC:{
  AO: {
    arguments
  },
  scopeChain: [fn2EC.AO, fn2.[[Scope]]]
  = [fn2EC.AO, fnEC.AO, globalEC.VO]
}


fnEC:{
  AO :{
    a: 6,
    fn2():function
  },
  scopeChain: [fnEC.AO, globalEC.VO]
}

fn2.[[Scope]] = fnEC.scopeChain
= [fnEC.AO, globalEC.VO]

globalEC: {
  VO: {
    a: 1,
    fn:function,
    fn2:undefined
    },
    scopeChain: [globalEC.VO]
}
```

遇到第三個 `console.log(a)`，此時 fn2() 內的 `console.log(a)` 會向上層 fn() 找變數 a 的值，所以這邊會輸出 6

6. 執行 fn2EC
```javascript
fn2EC:{
  AO: {
    arguments
  },
  scopeChain: [fn2EC.AO, fnEC.AO, globalEC.VO]
}

fnEC:{
  AO :{
    a: 6,
    fn2:function
  },
  scopeChain: [fnEC.AO, globalEC.VO]
}

globalEC: {
  VO: {
    a: 1,
    fn:function,
    fn2:function
    },
    scopeChain: [globalEC.VO]
}
```
執行 a = 20 時，由於 `fn2EC.AO` 裡面沒有變數 a，根據 scope chain 的關係往上一層找，找到 `fnEC.AO` 宣告過變數 a，因此將 a 賦值為 20。

執行 b = 20，但在整個作用域鍊裡找不到變數 b，於是會宣告一個全域變數 b 並賦值為 100。 fn2 執行完畢。


6. 結束fn2EC，印出下一行 `console.log(a)`
```javascript
fnEC:{
  AO :{
    a: 20,
    fn2:function
  },
  scopeChain: [fnEC.AO, globalEC.VO]
}

globalEC: {
  VO: {
    a: 1,
    fn:function,
    fn2:function,
    b: 100
  },
  scopeChain: [globalEC.VO]
}
```

此時第四個 `console.log(a)` 可以再 `fnEC.AO.a` 找到該值為 20

7. 離開 fnEC，執行下一行
```javascript

globalEC: {
  VO: {
    a: 1,
    fn:function,
    fn2:function,
    b: 100
  },
  scopeChain: [globalEC.VO]
}
```

執行 function 外的 `console.log(a)`，輸出 `globalEC.VO.a` 的值 1

8. 變數 a 賦值 10
```javascript

globalEC: {
  VO: {
    a: 10,
    fn:function,
    fn2:function,
    b: 100
  },
  scopeChain: [globalEC.VO]
}
```
下一行在 global scope 下的 `console.log(a)`，輸出 `globalEC.VO.a` 的值:10

下一行在 global scope 下的 `console.log(b)`，輸出 `globalEC.VO.b` 的值:100

## 輸出結果
```
undefined
5
6
20
1
10
100
```
