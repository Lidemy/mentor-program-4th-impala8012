<?php
    session_start();
    require_once('conn.php');
    require_once('utils.php');

    // 帳密不能為空
    if(empty($_POST['username']) || empty($_POST['password'])) {
        header('Location: login.php?errCode=1');
        die("資料輸入不齊全");
    }

    $username = $_POST['username'];
    $password = $_POST['password'];

    // 選取帳號匹配的資料
    $sql = "SELECT * FROM impala8012_blog_users WHERE username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $result = $stmt->execute();

    // 錯誤處理
    if(!$result) {
        die('ERROR:' . $conn->error);
    };

    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        header('Location: login.php?errCode=2');
        // 停止執行
        exit();
    } else {
        $_SESSION['username'] = $username;
        header('Location: index.php');
    }
    
?>