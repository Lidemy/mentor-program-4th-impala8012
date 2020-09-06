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
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
    $content = $_POST['content'];

    if(!hasPermission($user, 'create', NULL) {
        header('Location: index.php');
        exit();
    })

    // 把留言新增至資料庫
    $sql = "INSERT INTO impala8012_comments(username, content) VALUES(?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss', $username, $content);
    $result = $stmt->execute();
    
    // 錯誤處理
    if(!$result) {
        die('ERROR:' . $conn->error);
    } else {
        header('Location: index.php');
    };
?>