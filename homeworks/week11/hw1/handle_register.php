<?php
    session_start();
    require_once('conn.php');

    // 輸入內容不能為空
    if (empty($_POST['username']) || empty($_POST['password']) || empty($_POST['nickname']) ){
        header('Location: register.php?errCode=1');
        die('資料輸入不完全');
    };
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $nickname = $_POST['nickname'];

    // 註冊資訊新增至資料庫
    $sql = "INSERT INTO impala8012_users(username, password, nickname) VALUES(?,?,?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sss', $username, $password, $nickname);
    $result = $stmt->execute();


    if(!$result) {
        // 處理帳號已註冊
        $code = $conn->errno;
        if($code === 1062);
        header('Location: register.php?errCode=2');
    } else {
        // 成功
        $_SESSION['username'] = $username;
        header('Location: index.php');
    };
?>