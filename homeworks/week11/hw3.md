## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫

- 加密：一對一關係，如果被駭客知道我們用演算法加密，他們就可以很容易破解我們儲存的密碼。
- 雜湊：多對一關係，透過一連串的演算，將資料轉換成看似亂碼的字串。將很多個字串可能會對應到同一個密碼，雜湊無法還原。因此駭客無法逆堆回去我們儲存的密碼。
  加密可以解密，但是雜湊不可以還原，因次我們在儲存密碼的時候，使用雜湊加密就無法讓駭客破解出我們的密碼，增加資訊的安全性。

## `include`、`require`、`include_once`、`require_once` 的差別

- `require` 通常寫在程式開頭，因此在跑程式時，會先讀取`require`引入的檔案，讓他變成程式的一部分

- `include` 功能跟 `require` 一樣，不過通常使用在程式中。

- `include_once`、`require_once` 使用方法跟 `include` 以及 `require` 一樣，差別在於他們再引入檔案前，會先檢查檔案是否已經在其他地方被引入過，如果有的話，不會重複引入。

#### `include` 和 `require` 差別；

- `include` 適合動態的使用，php 讀取到`include` 時才會引用進來。找不到檔案時 `include` 會觸發 `Warning`，並且程式碼會繼續執行下去
- `require` 適合靜態的使用。`require` 如果找不到載入檔案的話，會直接出現 `Fatal Error`，立刻中止程式，程式不會執行。

## 請說明 SQL Injection 的攻擊原理以及防範方法

SQL 注入攻擊，是一種 Web 常見的攻擊事件。駭客可以利用資料庫的特行來間接操控資料庫從資料庫獲取資訊，像是添加用戶，新增留言，獲取資料庫的最高權限等等的惡意操作。
指令： 在登入處`' OR 1=1; --` ，因為 `1=1` 為 `true`，告訴資料庫輸入的所有值都是正確的，資料庫就會判定登入成功

防範方法：

- 過濾輸入值，可以透過 `Prepare Statement` 的方式，讓我們把輸入的資料透過編碼轉換成字串，這樣就不會執行到惡意程式碼。
- 限制應用的資料庫的操作權限：避免駭客可以有機會從中操作更多的部分。
- 避免網站印出 SQL 錯誤資訊：例如類型錯誤、字段不匹配等，把代碼裡的 SQL 語句暴露出來，以防止攻擊者利用這些錯誤資訊進行 SQL 注入。

## 請說明 XSS 的攻擊原理以及防範方法

XSS 攻擊：(Cross-site Scripting)，駭客可以利用 `<script>` 標籤，在裡面包住 JavaScript 程式碼，駭客就可以利用這個方法，進行操作，例如：導向釣魚網站或者讓頁面為空等等。

防範方法：使用跳脫字元的方式，將符號轉為其他的形式輸入至資料庫，例如：`<` 變成 `&lt;` 等等。在 PHP 裡面可以利用內建的函式 `htmlspecialchars()` 幫助我們達到達到想要的效果。

## 請說明 CSRF 的攻擊原理以及防範方法

CSRF (Cross Site Request Forgery) 跨網域的攻擊，利用殘存在我們電腦裡的 cookie 在不知情的時候，偽造出使用者本人發出 request 進行惡意攻擊。

只要瀏覽器在某網站是保持登入狀態，就存在 CSRF 的風險，其手法是欺騙瀏覽器、讓網站以為是使用者本人的操作

防範方法

1. 檢查 Referer：檢查 request 的 header 的 referer 欄位，這欄位代表這個 request 從哪個地方過來，可以檢查這個欄位看是不是合法的 domain，不是的話直接 reject 掉即可，但是很容易就破功，因此檢查 referer 並不是一個很完善的解法。

2. 加上圖形驗證碼、簡訊驗證碼：讓攻擊者不知道圖形驗證碼的答案，進而無法攻擊。

3. CSRF token；由 SERVER 產生一組隨機的 token 並儲存在 SERVER 裡。 當使用者發出 form request 時，攻擊者會不知道 token 內容，而 server 只要比對自己儲存的 token 跟 form 的 token 是否相同，就可以知道是不是使用者發出去的 request。

4. Double Submit Cookie：一樣由 server 產生一組隨機的 token 並且加在 form 上，也讓 client side 設定一個名叫 csrftoken 的 cookie，值也是同一組 token。server 比對 cookie 內的 csrftoken 與 form 裡面的 csrftoken，檢查是否有值並且相等，就知道是不是使用者發的了。

5. 瀏覽器防禦：在 set-cookie 後面加上 `Samsite`，這樣使用者的 cookie 就只能在 same site 上面使用，但要目前只有 Google Chrome 支援。
