<?php
    session_start();
    require_once('conn.php');
    require_once('utils.php');
    require_once('check_permission.php');
    
    $id = $_GET['id'];

    $sql = "UPDATE impala8012_blog_articles SET is_deleted = 1 WHERE id = ? ";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);
    $result = $stmt->execute();

    // 錯誤處理
    if(!$result) {
        die('ERROR:' . $conn->error);
    }
    header('Location: admin.php');
?>