## 請解釋後端與前端的差異。

（以購物網站為例）
網頁前端:
前端為我們看得到的地方，例如我們打開的任何網頁所看到的頁面，主要依靠 HTML, CSS, JavaScript 來處理
以購物網站來說就是我們看到的購物網站的頁面、按鈕、點選商品放大鏡、下拉式選單，將商品放入購物車等等都是網頁前端的範圍。

網頁後端:
我們主要看不到的地方，像是與資料庫溝通回傳資料到網頁前端等等，主要依靠程式語言以及資料庫，HTTP Server 等等。
在購物網站來說就是，使用者的會員帳號密碼的資訊存取、商品庫存、這些資料的讀取與儲存主要為網頁後端在管理

## 假設我今天去 Google 首頁搜尋框打上：JavaScript 並且按下 Enter，請說出從這一刻開始到我看到搜尋結果為止發生在背後的事情。

1. 當我們進入 google 送出關鍵字時，瀏覽器會先去問 DNS(8.8.8.8)， google 的 IP 位址是什麼
2. DNS 回應瀏覽器 Google 的 IP 位址為 172.217.160.68
3. 瀏覽器接著把我們的 request 封包(查詢的關鍵字 JavaScript )送到到 172.217.160.68 IP 位址
4. Google Server 收到 request 封包
5. Google Server 查詢資料庫，查詢我們給他的關鍵字 JavaScript
6. 資料庫找到後，回傳給 Google Server
7. Google Server 再回傳 response 封包給瀏覽器
8. 瀏覽器解析收到的 response 封包資訊並且顯示出來給使用者

註記: DNS Server，負責解析 DNS，Google 有免費的 DNS Server，IP 位置是 8.8.8.8
而 DNS server 跟 Google Server 是不同的東西

## 請列舉出 3 個「課程沒有提到」的 command line 指令並且說明功用

`ipconfig`：可以查詢自己網路設定例如： IP 位址，MAC 位址等等。
`find 檔案名` ： 在該目錄下尋找檔案的指令
`shutdown` ：關機 可以配合參數 `-r` 就會關機後重新開機
