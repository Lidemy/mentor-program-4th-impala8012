<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  require_once('check_permission.php');

  $id = $_GET['id'];
  $sql = "SELECT * FROM impala8012_blog_articles WHERE id =?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

  $result_cat = getCategories();

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
        <form action="handle_update_post.php" method="POST">
          <div class="edit-post__title">
            編輯文章：
          </div>
          <div class="edit-post__input-wrapper">
            <input class="edit-post__input" placeholder="請輸入文章標題" name="title" value="<?php echo escape($row['title'])?>"/>
          </div>
          <div class="edit-post__input-wrapper">
            <textarea rows="20" class="edit-post__content" name="content"><?php echo escape($row['content'])?></textarea>
          </div>
          <div class="edit-post__input-wrapper">
            分類：<select name="category_id" >
            <?php while($row_cat = $result_cat->fetch_assoc()) { 
                  $is_selected = $row['category_id'] === $row_cat['id'] ? 'selected' : "";  
            ?>
              <option value="<?php echo escape($row_cat['id'])?>" <?php echo $is_selected ?> >
                <?php echo escape($row_cat['name']) ?>
              </option>
            <?php } ?>
            </select>
          </div>
          <div class="edit-post__btn-wrapper">
              <input type="submit" class="edit-post__btn" value="送出"></input>
              <input type="hidden" name="id" value="<?php echo $row['id']?>">
              <input type="hidden" name="page" value="<?php echo $_SERVER['HTTP_REFERER']?>">
          </div>
        </form>
      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>