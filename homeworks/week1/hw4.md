## 跟你朋友介紹 Git

### 簡介:

「Git 是⼀種分散式版本的版本控制系統」。「版本控制系統」，指會幫你記錄這些所有的狀態變化，就像我們玩遊戲前遇到魔王時都會先紀錄存檔一樣，隨時切換到過去某個「版本」時候的狀態。
當檔案量很多的話，我們就會希望有一個版本控制的系統來幫助我們使用，在團隊上，一個軟體的開發會有不同的分支，要從某一個版本切出不同的分支，再由這些分支合併起來。

GitHub 目前全球最⼤的 Git Server。可以幫忙貢獻其它⼈的專案，其它⼈也可以回饋到你的專案。
Git 與 GitHub 的差別在於 Git 是一個工具而 GitHub 是一個網站

### Git 使用

首先如果我們有個專案要使用 git 讓他進行版本控制
指令: `git init`
這個指令會在這個⽬錄裡建立⼀個 .git 隱藏⽬錄，整個 Git 的需要的東西都在這個⽬錄裡。

新增一個檔案
`echo " Hello World" > git.html`

接著我們可以來查看目前版本控制的狀態
指令: `git status`
untracked files: 表示沒有加入到版本控制
staged: 已經加入到版本控制，但還沒有正式加入倒新的版本，目前還在暫存區

git.html 的檔案目前會在 untracked files，代表尚未加入版本控制

把檔案加入版控
指令: `git add 檔案名`
如果要一口氣加入全部的話可以用這個指令`git add .`
此時 git.html 的檔案就在 staged 裡面了

查看這一次做的差別跟上一次的差別
指令: `git diff`

加入版控後，需要再把檔案放入儲存庫 Repository 裡
指令: `git commit 檔案名 -m "這次修改的訊息"`
要注意的是 commit 指令執行後，只會把放入暫存區的檔案加入到 repository 裡面

如果嫌`git add`和`git commit`麻煩的話可以用
指令: `git commit -am "這次修改的訊息"` 把兩個指令給合併起來

- 假如 commit 的訊息做錯了想更改訊息的話
  指令: `git commit --amend`

- 假如 commit 做錯了想整個收回
  指令: `git reset head^ --hard` 把整個 commit 都移除，連改過的檔案也會移除
  指令: `git reset head^ --soft` 把 commit 收回但檔案還在，被放回到暫存區

如果要看歷史紀錄的話
指令: `git log`

以上是 git 的主要操作

由於我們目前是在 master 這個 branch 下做事，但如果再作專案的時候，比較建議另開一個 branch(類似先遊戲存檔的概念)
開新的 branch
指令: `git branch 名稱`

查看目前有哪些 branch
指令: `git branch -v`

我們從 master 切換到另一個 branch
指令: `git checkout branch名稱`

當我們再分支處理完後，就可以把分支做好的檔案把它合併回去到 master 裡面
指令: `git merge`

合併完後，就可以把之前的 branch 給移除
指令: `git branch -d branch名稱`

我們在本地端的作業就大功告成，接著換到遠端的 github，我們在本地端進行版本控制後，也需要在 GitHub 上開一個 Repository 讓他們可以彼此連結
首先先在 github 裡點選`new repository`
再命令提示自元輸入
指令:
`git remote add origin 網址`
`git push -u origin master`

`git push`的意思代表著把本地端的改變給傳上遠端 GitHub 端

假如我們再作共同專案時，有人改變了 repository，我們需要把那個改變後的檔案從 GitHub 遠端抓下來到我們本地端
指令: `git pull origin master`
