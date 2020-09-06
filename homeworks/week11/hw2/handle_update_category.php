<?php
    require_once("conn.php");
    require_once('check_permission.php');

    $name = $_POST['name'];
    $id = $_POST['id'];

    if(empty($name) || empty($id)){
        die('empty data');
    };

    $sql = "UPDATE impala8012_blog_categories SET name = ? WHERE id =?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si', $name, $id);
    $result = $stmt->execute();

    if($result) {
        header("Location: admin_category.php");
    } else {
        die('failed.' .$conn->error);
    }
?>