<?php
  session_start();
  require_once('conn.php');
  require_once('check_permission.php');
  require_once('utils.php');

  $sql = "SELECT * FROM impala8012_blog_categories WHERE is_deleted IS NULL ORDER BY created_at DESC";
  $stmt = $conn->prepare($sql);
  $result = $stmt->execute();
  $result = $stmt->get_result();
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
        <form action="handle_add.php" method="POST">
          <div class="edit-post__title">
            發表文章：
          </div>
          <div class="edit-post__input-wrapper">
            <input class="edit-post__input" placeholder="請輸入文章標題" name="title"/>
          </div>
          <div class="edit-post__input-wrapper">
            <textarea rows="20" class="edit-post__content" name="content"></textarea>
          </div>
          <div class="edit-post__input-wrapper">
            分類：<select name="category_id">
            <?php while($row = $result->fetch_assoc()){ ?>
              <option value="<?php echo $row['id']?>">
                <?php echo $row['name']?>
              </option>
            <?php } ?>
            </select>
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