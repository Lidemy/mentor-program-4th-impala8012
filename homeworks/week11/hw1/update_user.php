<?php
    session_start();
    require_once('conn.php');
    require_once('utils.php');

    // 內容不能為空
    if (empty($_POST['nickname']) ){
        header('Location: index.php?errCode=1');
        die('請輸入內容才能送出');
    };

    // 取要輸入的資料
    $username = $_SESSION['username'];
    $nickname = $_POST['nickname'];

    // 把留言新增至資料庫
    $sql = "UPDATE impala8012_users SET nickname=? WHERE username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss', $nickname, $username);
    $result = $stmt->execute();
    
    // 錯誤處理
    if(!$result) {
        die('ERROR:' . $conn->error);
    } else {
        header('Location: index.php');
    };
?>