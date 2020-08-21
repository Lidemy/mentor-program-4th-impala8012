<?php
    session_start();
    require_once('conn.php');
    require_once('utils.php');

    // 內容不能為空
    if (empty($_POST['content']) ){
        header('Location: index.php?errCode=1');
        die('請輸入內容才能送出');
    };

    // 取要輸入的資料
    $user = getUserFromUsername($_SESSION['username']);
    $nickname = $user['nickname'];
    $content = $_POST['content'];

    // 把留言新增至資料庫
    $sql = sprintf(
        "INSERT INTO comments(nickname, content) VALUES('%s','%s')",
        $nickname,
        $content
    );
    $result = $conn->query($sql);

    // 錯誤處理
    if(!$result) {
        die('ERROR:' . $conn->error);
    } else {
        header('Location: index.php');
    };
?>