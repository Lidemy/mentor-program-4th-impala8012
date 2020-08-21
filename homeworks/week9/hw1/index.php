<?php
    session_start();
    require_once('conn.php');
    require_once('utils.php');

    $username = null;
    if(!empty($_SESSION['username'])) {
        $username = $_SESSION['username'];
    }

    $result = $conn->query("SELECT * FROM comments ORDER BY id DESC");
    if(!$result) {
        die($conn->error);
    };

?>

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
    <title>留言板</title>
</head>
<body>
    <header class="warning">
        <strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
    </header>

    <main class="board">
    <?php if(!$username) {?>
        <a class="board__btn" href="register.php"><i class="far fa-file-alt"></i>註冊</a>
        <a class="board__btn" href="login.php"><i class="fas fa-user"></i>登入</a>
    <?php }else { ?>
        <a class="board__btn" href="logout.php"><i class="fas fa-sign-out-alt"></i>登出</a>
    <?php } ?>
        <h1 class="board__title">留言板</h1>
        <?php 
        if(!empty($_GET['errCode'])){
            $code = $_GET['errCode'];
            $msg = 'ERROR';
            if($code === '1') {
                $msg = '請輸入內容才能送出';
            };
            echo '<h2 class="error">錯誤：' . $msg . '</h2>';
        };
        ?>
        <form action="handle_add_comment.php" method="POST">
            <textarea name="content" rows="5" placeholder="此言論不代表本台立場"></textarea>
        <?php if($username) { ?>
            <input type="submit" class="board__submit-btn" value="送出">
        <?php } else{ ?>
            <h3>請先登入才能留言</h3>
        <?php } ?>
        </form>
        <div class="board__hr"></div>
        <section>
        <?php while($row = $result->fetch_assoc()){ ?>
            <div class="card">
                <div class="card__avatar"></div>
                <div class="card__body">
                    <div class="card__info">
                        <span class="card__author">
                            <?php echo $row['nickname'] ?>
                        </span>
                        <span class="card__time">
                            <?php echo $row['created_at'] ?>
                        </span>
                    </div>
                    <p class="card__content"><?php echo $row['content'] ?></p>
                </div>
            </div>
        <?php } ?>
        </section>
    </main>
</body>
</html>