<?php
    session_start();
    require_once('conn.php');
    require_once('utils.php');

    // 內容不能為空
    if (empty($_GET['id'])){
        header('Location: update_comment.php?errCode=1');
        die('請輸入內容才能送出');
    };

    // 取要輸入的資料
    $id = $_GET['id'];
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);

    // 刪除留言至資料庫
    if(isAdmin($user)) {
        $sql = "UPDATE impala8012_comments SET is_deleted=1 WHERE id=?";
    } else {
        $sql = "UPDATE impala8012_comments SET is_deleted=1 WHERE id=? AND username = ?";
    }
    $stmt = $conn->prepare($sql);
    if(isAdmin($user)) {
        $stmt->bind_param('i', $id);
    } else {
        $stmt->bind_param('is', $id, $username);
    }
    $result = $stmt->execute();
    
    // 錯誤處理
    if(!$result) {
        die('ERROR:' . $conn->error);
    } else {
        header('Location: index.php');
    };
?>