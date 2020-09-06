<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');


  $id = intval($_GET['id']);
  $sql = "SELECT ". 
  "A.id AS id, A.title AS title, A.content AS content, A.category_id AS category_id, ".
  "C.name AS name, A.created_at AS created_at ". 
  "FROM impala8012_blog_articles AS A ".
  "LEFT JOIN impala8012_blog_categories AS C ON A.category_id = C.id ".
  "WHERE A.id =? ORDER BY created_at DESC";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

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
    <div class="posts">
      <article class="post">
        <div class="post__header">
          <div><?php echo escape($row['title']); ?></div>
          <div class="post__actions">
            <a class="post__action" href="index.php">回首頁</a>
          <?php if(!empty($_SESSION['username'])) {?>
            <a class="post__action" href="update.php?id=<?php echo escape($row['id']);?>">編輯</a>
          <?php }?>
          </div>
        </div>
        <div class="post__info">
          <?php echo escape($row['created_at']) ?>
          <span class="category"><?php echo escape($row['name'])?></span>

        </div>
        <div class="post__content"><?php echo escape($row['content']) ?>
        </div>
      </article>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>