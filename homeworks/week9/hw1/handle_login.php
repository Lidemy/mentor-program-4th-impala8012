<?php
    session_start();
    require_once('conn.php');

    // 帳密不能為空
    if (empty($_POST['username']) || empty($_POST['password']) ){
        header('Location: login.php?errCode=1');
        die('資料輸入不完全');
    };

    $username = $_POST['username'];
    $password = $_POST['password'];

    // 選取到帳密皆匹配的資料
    $sql = sprintf(
        "SELECT * FROM users WHERE username = '%s' AND password = '%s' ",
        $username,
        $password
    );
    $result = $conn->query($sql);

    // 錯誤處理
    if(!$result) {
        die('ERROR:' . $conn->error);
    };

    // 有讀取資料=>登入成功
    if($result->num_rows){
        $_SESSION['username'] = $username;
        header('Location: index.php');
    } else {
        header('Location: login.php?errCode=2');
    };
?>