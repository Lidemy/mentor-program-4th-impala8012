## Redux middleware 是什麼？
Redux Middleware 可以在 Action 被 Dispatch 後，進到 Reducer 前，去進行額外的處理。例如呼叫 API。因為 redux 本身無法處理非同步的 action

Redux 提供了一個 middleware 介面，讓第三方套件可以插入在 react 與 redux 中間。
比方說我們可以用 middleware 來處理 logger、非同步事件。舉例來說，使用 redux-logger 幫助記錄存入 redux 前後的狀態，以及使用 redux-saga 處理非同步的 API 請求。

## CSR 跟 SSR 差在哪邊？為什麼我們需要 SSR？
CSR(Client Side Rendering):客戶端渲染，react原生的範例就是CSR。
指網頁的畫面都是在前端由 JS 動態產生，所以當我們查看網頁原始碼時，只會看到沒什麼內容的 HTML，所以也會導致搜尋引擎在爬資料時，獲取不到網站的相關資料也意味著不利於 SEO 優化
SSR（Server-side-rendering）是指內容和畫面在 Server 端就準備好才傳給 Client 端的瀏覽器。

## React 提供了哪些原生的方法讓你實作 SSR？


## 承上，除了原生的方法，有哪些現成的框架或是工具提供了 SSR 的解決方案？至少寫出兩種


