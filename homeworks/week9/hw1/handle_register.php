<?php
    session_start();
    require_once('conn.php');

    // 輸入內容不能為空
    if (empty($_POST['username']) || empty($_POST['password']) || empty($_POST['nickname']) ){
        header('Location: register.php?errCode=1');
        die('資料輸入不完全');
    };
    $username = $_POST['username'];
    $password = $_POST['password'];
    $nickname = $_POST['nickname'];

    // 註冊資訊新增至資料庫
    $sql = sprintf(
        "INSERT INTO users(username, password, nickname) VALUES('%s','%s','%s')",
        $username,
        $password,
        $nickname
    );
    $result = $conn->query($sql);


    if(!$result) {
        // 利用errno來處理帳號已註冊
        $code = $conn->errno;
        if($code === 1062)
        header('Location: register.php?errCode=2');
    } else {
        // 成功
        header('Location: index.php');
    };
?>