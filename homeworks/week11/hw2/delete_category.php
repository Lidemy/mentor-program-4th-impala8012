<?php
    session_start();
    require_once('conn.php');
    require_once('utils.php');
    require_once('check_permission.php');

    $id = $_GET['id'];
    $username = $_SESSION['username'];

    $sql = "UPDATE impala8012_blog_categories SET is_deleted = 1 WHERE id = ? AND username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('is', $id, $username);
    $result = $stmt->execute();

    // 錯誤處理
    if(!$result) {
        die('ERROR:' . $conn->error);
    }
    header('Location: admin_category.php');
?>