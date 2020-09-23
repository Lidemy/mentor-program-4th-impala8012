## Webpack 是做什麼用的？可以不用它嗎？
Webpack 是一個可以幫我們 模組化及打包的工具，幫助前端開發時透過模組化方式，方便組織與管理，再透過 Webpack 解析，把這些模組組合起來，打包成單一檔案，變成成瀏覽器可以看得懂的內容。

不過他只是其中一個工具，所以其實也可以轉換其他工具使用或者自行解析成瀏覽器看得懂的內容也行。

## gulp 跟 webpack 有什麼不一樣？
gulp 是一套任務管理器，主要在於任務和流程管理，它的任務可以有很多種，讓我們方便管理，能夠優化前端的開發流程的工具，例如：對某些文件進行類似編譯，組合，壓縮等任務的具體步驟

webpack 是打包工具，用於模組化方案，編譯模組。目的是讓瀏覽器能夠支援 module，把互相依賴的模組串接再一起，打包合併為瀏覽器可以看得懂的內容。

## CSS Selector 權重的計算方式為何？
比較順序依序為
1. !important
2. inline style (html 文件中直接下 CSS 屬性)
3. ID 
4. class / pseudo class (:hover / :focus / :nth-child())
5. Elements / pseudo-elements (:before / :after / :first-letter)
6. 標籤

不過 1 和 2 平常不太介意使用此方式來下 CSS。