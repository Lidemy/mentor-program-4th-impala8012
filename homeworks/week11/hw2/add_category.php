<?php
  session_start();
  require_once('check_permission.php');

  $username = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }
?>


<!DOCTYPE html>
<html>
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
        <form action="handle_add_category.php" method="POST">
          <div class="edit-post__title">
            新增分類：
          </div>
          <div class="edit-post__input-wrapper">
            <input class="edit-post__input" placeholder="請輸入分類名稱" name="name"/>
          </div>
          <div class="edit-post__btn-wrapper">
              <input type="submit" class="edit-post__btn" value="送出"></input>
          </div>
        </form>
      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>