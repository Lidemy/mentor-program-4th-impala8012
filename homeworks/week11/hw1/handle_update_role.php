<?php
    session_start();
    require_once('conn.php');
    require_once('utils.php');

    // 內容不能為空
    if (empty($_GET['id']) || empty($_POST['role'])) {
        die('資料不齊');
    };   

    // 取要輸入的資料
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
    $id = $_GET['id'];
    $role = $_POST['role'];  

    if(!$user || $user['role'] !== 'admin') {
        header('Location: admin.php');
        exit();
      }

    // 更新會員至資料庫
    $sql = "UPDATE impala8012_users SET role=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si', $role, $id);
    $result = $stmt->execute();
    
    // 錯誤處理
    if(!$result) {
        die('ERROR:' . $conn->error);
    }
        
    header('Location: admin.php');
?>