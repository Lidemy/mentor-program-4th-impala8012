一開始在架設網站時，原本想說註冊 AWS 後看個官方文件教學，應該就可以知道在做什麼，結果看完了之後，直接困惑了許久，有種還是不知道何時下手。

繼續估狗了看其他的資料 [參考影片-Progress Bar 進度條線上課程](https://www.youtube.com/watch?v=RUZ7gCo7gws&list=PL2SrkGHjnWcwe-wh-JpOPNldKBh0094GH) 找到了這篇關於 AWS 的教學影片，順利地利用 CLI 連線到主機。

接著看到之前第三期學長的文章 [參考文章-部屬 AWS EC2 雲端主機 + LAMP Server + phpMyAdmin + CloudFlare](https://medium.com/@hugh_Program_learning_diary_Js/%E9%83%A8%E5%B1%AC-aws-ec2-%E9%9B%B2%E7%AB%AF%E4%B8%BB%E6%A9%9F-lamp-server-phpmyadmin-cloudflare-43871cd5dd01)，照著學長的文章，一筆一筆的敲出來，連到了 apache 的伺服器時上面寫說 it works，很興奮感覺快要有個雛形，彼此伺服器之間有順利的連上。![](https://i.imgur.com/iZM5sFs.png)

殊不知，不知道怎麼的，感覺跟資料庫犯沖，要連 phpmyadmin 的時候出現 404 Not Found 頁面，處理了很久。看了很多的資料了找到了另一篇第二期學長的筆記裡面也跟我出現一樣的問題，依序照著指令，把問題解決。[[筆記]部署 AWS EC2 虛擬主機 + Ubuntu LAMP 環境 + phpmyadmin #30
](https://github.com/enter3017sky/mentor-program-2nd-blog/issues/30)，接著開始來設定資料庫，照著之前設定的模式，設定完後，指令一直出現錯誤，原先想說應該沒什麼影響只是個 warning ，就直接進入上傳檔案的步驟，殊不知資料庫更新不太起來，照著這篇 [Install phpMyAdmin on Ubuntu](https://blog.johnsonlu.org/install-phpmyadmin-on-ubuntu/)的設定，才完全把 phpmyadmin 之間Warning 的問體處理完畢。

上傳檔案的時候，看到了指令`$sudo chmod -R 777 路徑`，突然好奇 777 是什麼，研究了一下 linux 系統的權限，才發現是一個數學的浪漫(?)，在 Linux 系統裡面有三個身分分別是 owner/group/others 並且可以設定自己的 read/write/execute 的權限，每組權限對應的數字為 (r:4，w:2，x:1)，777 三個數字分別對應到三個身分，而 7 為 (4+2+1)，代表著該身分所有的權限都打開的意思。
[鳥哥的 Linux 私房菜](http://linux.vbird.org/linux_basic/0210filepermission.php)

部屬完成後，深深覺得很感謝前人的資訊，才能如此順利完成，經過自己手動部署以及遇到各問題，印象也更深刻了些。

