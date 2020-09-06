<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $username = NULL;
  $user = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }

?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>部落格</title>
  <link rel="stylesheet" href="style.css" />
  <link rel="stylesheet" href="normalize.css" />
</head>
<body>
<?php include_once('header.php')?>

  <section class="banner">
    <div class="banner__wrapper">
      <h1>存放技術之地</h1>
      <div>Welcome to my blog</div>
    </div>
  </section>
  <div class="profile-container">
    <div class="profile">
      <div class="profile-photo">
        <img src="./可達鴨.jpg" alt="">
      </div>
        <div class="profile-title">
            <h2>Dylan Lo</h2>
        </div>
        <div class="profile-content">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, in excepturi? Nihil, modi consequuntur fuga ipsa neque sit laborum dignissimos.</p>
        </div>
    </div>
  </div>

  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html> 