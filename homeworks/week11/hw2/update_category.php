<?php
    session_start();
    require_once('conn.php');
    require_once('utils.php');
    require_once('check_permission.php');

    $id = $_GET['id'];
    
    $sql = "SELECT * FROM impala8012_blog_categories WHERE id=? ";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);
    $result = $stmt->execute();
    if(!$result) {
        die($conn->error);
    };
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
?>


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">

  <title>部落格</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="normalize.css" />
  <link rel="stylesheet" href="style.css" />
</head>

<body>
<?php include_once('header.php')?>
<section class="banner">
    <div class="banner__wrapper">
      <h1>存放技術之地</h1>
      <div>Welcome to my blog</div>
    </div>
  </section>
  <div class="container-wrapper">
    <div class="container">
      <div class="edit-post">
        <form action="handle_update_category.php" method="POST">
          <div class="edit-post__title">
            編輯分類：
          </div>
          <div class="edit-post__input-wrapper">
            <input class="edit-post__input" placeholder="請輸入分類名稱" name="name" value="<?php echo escape($row['name'])?>"/>
          </div>
          <div class="edit-post__btn-wrapper">
              <input type="submit" class="edit-post__btn" value="送出"></input>
              <input type="hidden" name="id" value="<?php echo escape($row['id'])?>">
              <input type="hidden" name="page" value="<?php echo $_SERVER['HTTP_REFERER']?>">
          </div>
        </form>
      </div>
    </div>
  </div>
    <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>