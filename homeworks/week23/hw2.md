## 為什麼我們需要 Redux？
原本一開始都是利用 React 都是透過各個 component 來改變 state，假如當我們的專案規模較大的時候，很容易遇到多個 Component 會用到同樣的 state，這樣會讓每個 component 跟 state 的關係變得錯綜複雜

Redux 就是處理這樣的問題，將所有的 State 存在 Component 堆疊中的最上層 Store，根據各個 Component 的需要切出資料並往下傳遞，這樣一來 Store 以下的 Component 就幾乎都可以做到 Stateless 了。（當然大多數情況下還是需要 Container 持有 UI State）

## Redux 是什麼？可以簡介一下 Redux 的各個元件跟資料流嗎？
Redux 是一個實作狀態管理的機制的套件，用來集中式的管理資料，這個資料管理容器又稱為 Store (倉庫)，主要由 State、Action、Reducer 組成。

此外 Redux 的資料流是單向資料流，我們把 Action 透過 dispatch 的方式傳送給 Reducer，接著 Reducer 再把新的 State 儲存在 Store 裡面 。


### Store
負責儲存狀態，可以被 react api 呼叫，發布 action
可以透過 `store.getState()` 拿狀態，透過傳進一個 `rootReducer`，再利用 `createStore()` 來建立

### State
用來儲存整個應用程式的資料，由一個單一的 Object Tree 構成，以遵循 Single Source of Truth 原則。
透過 store.getState() 來取得 State。

### Action
要改變 State 唯一的方式就是指派一個 Action，而 Action 本身就只是一個 Object，但 Action 不會直接修改 State，而是交由 Reducer 來處理。
action 必須帶有一個 type 用來描述發生的事件類別，如果有額外的資料可以放在 payload
透過 `store.dispatch()` 來指派 Action。

### Reducer
Reducer 是一個 Pure Function，能夠取得當前的 State 和被指派的 Action，並且回傳一個新的 State。
當 Reducer 被執行的時候，initialState 會當作 state 的預設值

## 該怎麼把 React 跟 Redux 串起來？
我們可以利用 react-redux 的套件幫助我們把 React 和 Redux 串起來，可以透過 connect API 和 hooks API 兩種方法來連結

就像需求單一樣，定義要從 store 中取得的資料，並將 component 與該需求單做連結，之後再利用 Provider 將 store 根據需求單將資料流進 component 中。

所以我們從 react-redux 中引入 Provider 並在 component 的最頂層使用 `<Provider store={store}>` 傳入 store，讓所有 children component 都拿得到 store
### connect API
`connect`：使用 `connect()`，它從最頂層中獲取到 store，進而得到 state，然後透過 `mapStateToProps`、`mapStateToDispatch`將 state 處理後以 props 的形式傳遞給 presentational component 的 props

```js
const connectToStore = connect(mapStateToProps, mapDispatchToProp);
```

`mapStateToProps`(state, ownProps, …)：該函式內部定義需要哪些資料，會將 state 轉換成為 component 的 props，最後返回一個 object，這個 object 會以props的形式傳給 component。
```javaScript
const mapStateToProps = (state) => {
  return {
    state: store.state,
  };
};
```

`mapDispatchToProps`(dispatch, ownProps, …)：此參數可以是一個函式或物件，返回一個 object，將 dispatch 以 props 的方式傳給 component。如果此參數為 null，react-redux 會將 dispatch 作為 props 傳入 component 中，在 component 內可以直接使用 dispatch(action) 來表明一個動作的发生。
```javaScript
const mapDispatchToProps = (dispatch) => {
  return onClick : (
    value) => {
      dispatch(action(value))
    }
}
```

### hooks API
不用 `Connect()` ，因此也不會用到 mapStateToProps 和 mapDispatchToProps。
改用 `useDispatch`跟 `useSelector`，
 `useSelector` 從 Store 中，將 Component 需要的 State 取出，取得我們想要的 state
 `useDispatch` 產生 dispatch 方法，透過它觸發 Reducer