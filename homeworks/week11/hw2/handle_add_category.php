<?php
    session_start();
    require_once('conn.php');
    require_once('check_permission.php');

    $name = $_POST['name'];
    $username = $_SESSION['username'];

    if(empty($name)){
        header('Location:add_category.php');
        die('empty data');
    };

    $sql = "INSERT INTO impala8012_blog_categories(name, username) VALUES (?,?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss', $name, $username);
    $result = $stmt->execute();

    if($result) {
        header("Location: admin_category.php");
    } else {
        die('failed.' .$conn->error);
    }
?>