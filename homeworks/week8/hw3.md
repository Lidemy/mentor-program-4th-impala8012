## 什麼是 Ajax？
Ajax(Asynchronous JavaScript and XML)
**非同步**與伺服器交換資料， Ajax 利用 JavaScript 透過瀏覽器發 request 到 server 交換資料。 Server 回傳response 到瀏覽器，經由瀏覽器把結果傳到瀏覽器上的 JavaScript，再利用我們接收到的資料呈現在網頁上。
早期是用XML 來做為資料的格式，目前則是用JSON。

## 用 Ajax 與我們用表單送出資料的差別在哪？
用 AJAX 移交表單時， Server 回傳 response 給瀏覽器，瀏覽器會先把結果渲染出來再到 JavaScript 上面。
如果是用一般 form 表單形式的話，每次只要提交表單或要新的資料時，都會必要要換頁。

相較之下透過Ajax，能減少資源的佔用。

## JSONP 是什麼？
利用瀏覽器來拿資料時，如果處於不同個 domain 之下，會有同源政策來確保資料傳輸的安全性的協定，因此瀏覽器不會將返回的 response 給我們。
而JSONP(Json with padding)，主要透過`<script>`標籤，利用 script 標籤的 src 屬性不受同源政策限制的特性來跟伺服器溝通，讓我們達成跨網域取得資料的請求。

## 要如何存取跨網域的 API？
如果要跨來源資源共用(CORS)的話，需要在 server 端的 header 上要加上 Access-Control-Allow-Origin，這樣 client 端就可以拿到 response。


## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？
在第四周的時候，當時我們的執行環境是node.js，因此沒有同源政策，所以不會擋下跨網域的請求。
而跨來源資源共享，同源政策都是瀏覽器上面的規範，所以這周我們利用瀏覽器來交換資料時，就必須受到瀏覽器的規範。
