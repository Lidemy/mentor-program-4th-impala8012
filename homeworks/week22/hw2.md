## 請列出 React 內建的所有 hook，並大概講解功能是什麼
### `useState()` 
他會回傳一個陣列，`useState()`裡面會放初始值，參數只會在初始 render 時使用，在後續 render 則會被忽略。
陣列裡面會放兩個元素，陣列中第一個元素是「想要監控的資料」，陣列中的第二個元素是「修改該資料的方法」
例如：`const [count, setCount] = useState("")`

### `useEffect`
useEffect 這個方法的參數中放入一個函式，而這個函式會在每一次畫面渲染完成後被呼叫，因此他提供了第二個參數 dependencies，只要每次重新渲染後 dependencies 內的元素沒有改變，任何 useEffect 裡面的函式就不會被執行，所以我們就可以把指定的 state 放入陣列裡面，可以監控此 state，如果有改變的話才會重新渲染畫面。
例如：`useEffect(<function>, [dependencies])`

### `useContext`
接收一個 createContext 的回傳值，並回傳這個 context 目前的值，這使得 parent component 下的任何一個 children component 都能更輕易的取得 parent component 的資料，就不用每一層都傳一次 props。

###  `useReducer`
用來處理物件型態的狀態，接收 reducer 和 initialState，然後回傳現在的 state 和其配套的 dispatch 方法，reducer 這個函式會依據不同的 action 回傳不同的 state


### `useCallback`
當 function 需要在 `useEffect` 中被使用但又不想加入觸發條件。
`useCallback`的用法和 `useEffect` 一樣，同樣帶入兩個參數，第一個參數是一個函式，在這個函式中就去執行你真正要呼叫的函式，第二個參數一樣是 dependencies。能讓 React 組件內所定義的函式在 dependencies 不變的情況被保存下來。不同的地方是 useCallback 會回傳一個函式，只有當 dependencies 有改變時，這個回傳的函式才會改變

### `useMemo`
`useMemo` 也提供了一個 dependencies 的陣列，只有當 dependencies 改變時才會更新。 useMemo 會在 dependencies 沒有改變的情況下，把某個運算的結果保存下來，進行較複雜的運算時可以使用它來改善效能。

`useCallback(fn, deps) 等同於 useMemo(() => fn, deps)`

### `useRef`
在 useRef 內可以放進一個預設值（initialValue），他會會回傳一個物件（refContainer）這個物件不會隨著每一次畫面重新渲染而指稱到不同的物件，而是可以一直指稱到同一個物件，在回傳的物件中，透過 refContainer.current 屬性可以取得預設值或更動後的值
當我們在 React 組件中想要定義一些「變數」，但當這些變數改變時，又不需要像 state 一樣會重新導致畫面渲染的話，就很適合使用 useRef。

### `useImperativeHandle` 
將 children component 的某些函式透過 ref 的方式給 parent component 呼叫

### `useLayoutEffect`  
與 useEffect 的功能相同，不過 useLayoutEffect 觸發的時機點會在 DOM 改變完之後、瀏覽器 paint 之前執行，React 官方建議還是先使用 useEffect，只當它有問題時才嘗試使用 useLayoutEffect

###  `useDebugValue` 
用來在 React DevTools 中顯示自訂義 hook 的標籤

## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點
![](https://i.imgur.com/F7NyrYP.png)
### class component 的 lifecycle 可區分為三個執行階段

- Mounting： 當 component 被加入到 DOM 中時會觸發
- Updating： 當 component 的 props 或 state 更新，重新渲染 (re-rendered) DOM 時觸發
- Unmounting： 當元件要從 DOM 中被移除時觸發

### 流程
Mounting
1. 首先先呼叫 `constructor` 針對 state、props 做初始化，建立 Component
2. 接著呼叫 `render` 到畫面上
3. 呼叫 `componentDidMount`。`componentDidMount` component 被掛在 DOM Tree（mount）後觸發。

Updating
1. state 更新 => 呼叫 `update`
2. 首先會先執行 `render`
3. 接著執行 `componentDidUpdate` 告訴已經更新了。`componentDidUpdate` 為 component 在 update 也就是 state 改變之後執行

UnMounting
`componentWillUnmount`：component 在 DOM Tree 上移除（unmount） 之前執行，我們把他從畫面上去除才會觸發這個生命週期

## 請問 class component 與 function component 的差別是什麼？
class component：透過 ES6 class 語法來實作基於物件導向的元件
functional component：利用閉包來管理狀態 funtion 元件且接近原生的寫法，編譯後只有渲染 JSX 時需要叫用 react 提供的函式。

class component ：以 class 的 instance 為主體去思考
function component: hooks 是以 function 為主體去思考。此外 function component 的每一次渲染，都是一個新的 function 呼叫

class component : 是在生命週期裡決定要做什麼事情
function component： 在 component render 完後，某個 state 或 props 改變的時候要做什麼事情

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？
在 React 中表單元素的處理主要可以分成兩種 Controlled 和 Uncontrolled 這兩種，關於 Controlled 和 Uncontrolled 指的是**資料有沒有受到 React 所控制**。
Controlled Component：受 React 所控制的資料
Uncontrolled Component：不受 React 所控制的資料

把表單內使用者輸入的資料交給 React，在使用者輸入資料的同時驗證使用者輸入內容的有效性，並做瀏覽器畫面的更新，這種受 React 控制的資料舊稱作為 Controlled Component

選取到該表單元素後，才從該表單元素取出值的這種做法，就稱作 Uncontrolled Component
若要取的 Uncontrolled Component 的 state 則必須直接操作 DOM 或使用 `useRef` 方式才能取到值，如果有重新渲染畫面的需求，建議還是使用 Controlled Component 來處理。