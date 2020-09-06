<?php
    session_start();
    require_once('conn.php');
    require_once('utils.php');
    require_once('check_permission.php');


    if(empty($_POST['title']) || empty($_POST['content']) || empty($_POST['category_id'])){
        header('Location: update.php?errCode=1');
        die('empty data');
    };

    $title = $_POST['title'];
    $content = $_POST['content'];
    $category_id = $_POST['category_id'];
    $id = $_POST['id'];
    $page = $_POST['page'];

    $sql = "UPDATE impala8012_blog_articles SET title = ?, content =?, category_id = ? WHERE id =?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ssii', $title, $content, $category_id, $id);
    $result = $stmt->execute();

    if(!$result) {
        die('ERROR:' . $conn->error);
    } else {
        header('Location: ' . $page);
    };
?>