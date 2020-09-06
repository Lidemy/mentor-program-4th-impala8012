<?php
    session_start();
    require_once('conn.php');
    require_once('utils.php');

    $id = $_GET['id'];
    $username = NULL;
    $user = NULL;
    if(!empty($_SESSION['username'])) {
        $username = $_SESSION['username'];
        $user = getUserFromUsername($username);
    }

    $stmt = $conn->prepare(
        "SELECT * FROM impala8012_comments WHERE id = ?"
    );
    $stmt->bind_param('i', $id);
    $result = $stmt->execute();
    if(!$result) {
        die($conn->error);
    };

    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

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
        <h1 class="board__title">編輯留言</h1>
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
        <form action="handle_update_comment.php" method="POST">
            <textarea name="content" rows="5" placeholder="此言論不代表本台立場"><?php echo escape($row['content'])?></textarea>
            <!-- 利用隱藏的 input 把id 帶入到下個頁面 -->
            <input type="hidden" name="id" value="<?php echo $row['id']?>">
            <input type="submit" class="board__submit-btn" value="送出">
        </form>

    </main>

</body>
</html>