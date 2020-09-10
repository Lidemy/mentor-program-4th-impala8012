<?php
    session_start();
    require_once('conn.php');
    require_once('utils.php');

    // 內容不能為空
    if (empty($_POST['content'])){
        header('Location: update_comment.php?errCode=1&id='.$_POST['id']);
        die('請輸入內容才能送出');
    };

    // 取要輸入的資料
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
    $id = $_POST['id'];
    $content = $_POST['content'];

    // 把留言新增至資料庫
    if (isAdmin($user)) {
        $sql = "UPDATE impala8012_comments SET content=? WHERE id=?";
    } else {
        $sql = "UPDATE impala8012_comments SET content=? WHERE id=? AND username=?";
    }
    $stmt = $conn->prepare($sql);
    if(isAdmin($user)) {
        $stmt->bind_param('si', $content, $id);
    } else {
        $stmt->bind_param('sis', $content, $id, $username);
    }
    $result = $stmt->execute();
    
    // 錯誤處理
    if(!$result) {
        die('ERROR:' . $conn->error);
    } else {
        header('Location: index.php');
    };
?>