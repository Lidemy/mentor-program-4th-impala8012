<?php
    session_start();
    require_once("conn.php");
    require_once('check_permission.php');


    $title = $_POST['title'];
    $content = $_POST['content'];
    $category_id = $_POST['category_id'];


    if(empty($title) || empty($content) || empty($category_id) ){
        header('Location:add.php');
        die('empty data');
    };

    $sql = "INSERT INTO impala8012_blog_articles(title, content, category_id) VALUES (?,?,?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ssi', $title, $content, $category_id);
    $result = $stmt->execute();

    if($result) {
        header("Location: admin.php");
    } else {
        die('failed.' .$conn->error);
    }
?>