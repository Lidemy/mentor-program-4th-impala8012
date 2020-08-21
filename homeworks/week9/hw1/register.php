<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="normalize.css">
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.14.0/css/all.css"
    />
    <title>留言板-註冊</title>
</head>
<body>
    <header class="warning">
        <strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
    </header>

    <main class="board">
        <a class="board__btn" href="index.php"><i class="fas fa-home"></i>回首頁</a>
        <a class="board__btn" href="login.php"><i class="fas fa-user"></i>登入</a>
        <h1 class="board__title"><i class="far fa-file-alt"></i>註冊</h1>
        <?php 
        if(!empty($_GET['errCode'])){
            $code = $_GET['errCode'];
            $msg = 'ERROR';
            if($code === '1') {
                $msg = '資料輸入不齊全';
            } else if ($code = '2') {
                $msg = '帳號已註冊';
            };
            echo '<h2 class="error content-center">錯誤：' . $msg . '</h2>';
        };
        ?>
        <form action="handle_register.php" method="POST" class="content-center">
            <div class="board__nickname">
                <span>帳號：</span>
                <input type="text" name="username" placeholder="請輸入帳號" class="board__input">
            </div>

            <div class="board__nickname">
                <span>密碼：</span>
                <input type="password" name="password" placeholder="請輸入密碼" class="board__input">
            </div>

            <div class="board__nickname">
                <span>暱稱：</span>
                <input type="text" name="nickname" placeholder="請輸入暱稱" class="board__input">
            </div>
            <input type="submit" class="board__submit-btn" value="送出">
        </form>
    </main>
</body>
</html>