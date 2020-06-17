## 交作業流程

1. 首先把 Lidemy 課綱 repository 從 github 複製到到本地端 `git clone 網址`
2. 從本地端切換到此 repository 的資料夾
3. 在本地端新增一個 branch `git branch week1`
4. 切換到 week1 的 branch `git checkout week1`
   [附註：3&4 的步驟可簡化為`git checkout -b week1`]
5. 開始寫作業 確認檔案是否要更改過 `git status`
6. 寫完後的檔案把他加入到暫存區 `git add .`
7. 再進一步把他加入到儲存庫 `git commit -am "week 1作業完成"`
8. 再把作業從本地端推到遠端 github 上面 `git push origin week 1`
9. 回到 github 頁面點選`pull request` -> `compare & pull request` 把 week 1 merge 到 master 裡面
   確認後點選 `create pull request`
   [附註：如果沒有出現`compare & pull request`，可以`New pull request`手動操作把 branch 加入至 master]
10. 到學習系統->作業列表->新增作業->選擇繳交的週數並貼上`pull request`的連結
11. 助教改完會 merge 並把遠端的 branch 移除(無須操作)
12. 確認 merge 完後 在本地端回到 master `git checkout master`
13. 把遠端的 master 與本地端的 master 同步 `git pull master`
14. 接著把本地端的 branch 也移除 `git branch -d week 1`
15. 檢查 branch 是否已經刪除 `git branch -v`
16. 最終檢查是否都成功 `git log`
