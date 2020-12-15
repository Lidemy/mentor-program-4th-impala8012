## 為什麼我們需要 React？可以不用嗎？

React 是一套提供給 JavaScript 方便我們開發的一個套件，React 將網頁邏輯分成畫面和資料分開管理以及將 Compopent 模組化，不只可以重複使用，也更方便維護。

此外透過 Virtual DOM 的形式，利用演算法根據新舊的資料狀態做比對來決定是否更新畫面，節省 re-render 時間和效能。

由於 React 是一套 JavaScript 的套件，因此也可以純用 JavaScript 來達成，只是在比較大型的專案上會相較於複雜許多，較小的專案則可以不一定要使用 React 。

## React 的思考模式跟以前的思考模式有什麼不一樣？

之前是利用畫面來去思考資料的呈現，而現在則是畫面是利用不同的 Component 組成，將「資料」與「畫面」做連結，透過 state 存取資料，一旦資料的狀態更動，就會連動更改相關的畫面，因此我們只需要注意資料狀態的改動。

## state 跟 props 的差別在哪裡？

state：component 本身的資料，只有該 component 本身，才能改變到自己的 state。

props：父層 component 傳遞下來的資料，也可以當作參數來看，可將 props 視為父層與子層的溝通橋梁。
對於父層 component 的資料就是它的 state，當父層的 state 傳遞到子層時，該資料則為子層的 props。
