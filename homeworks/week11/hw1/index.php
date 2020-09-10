<?php
    session_start();
    require_once('conn.php');
    require_once('utils.php');

    $username = NULL;
    $user = NULL;
    // 從網址列拿出現在頁數
    if(!empty($_SESSION['username'])) {
        $username = $_SESSION['username'];
        $user = getUserFromUsername($username);
    };

    $page = 1;
    if (!empty($_GET['page'])){
        $page = intval($_GET['page']);
    };
    $item_per_page = 5;
    $offset = ($page - 1) * $item_per_page;

    $stmt = $conn->prepare(
        "SELECT " . 
            "C.id AS id, C.content AS content, C.created_at AS created_at, " . 
            "U.nickname AS nickname, U.username AS username " .
        "FROM impala8012_comments AS C " .
        "LEFT JOIN impala8012_users AS U ON C.username = U.username " .
        "WHERE C.is_deleted is NULL ".
        "ORDER BY C.id DESC ". 
        "limit ? offset ?"
    );
    $stmt->bind_param('ii', $item_per_page, $offset);
    $result = $stmt->execute();
    if(!$result) {
        die($conn->error);
    };

    $result = $stmt->get_result();

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="normalize.css">
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.14.0/css/all.css"
    />
    <title>留言板</title>
</head>
<body>
    <header class="warning">
        <strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
    </header>

    <main class="board">
    <?php if(!$username) {?>
        <a class="board__btn" href="register.php"><i class="far fa-file-alt"></i>註冊</a>
        <a class="board__btn" href="login.php"><i class="fas fa-user"></i>登入</a>
    <?php }else { ?>
        <a class="board__btn" href="logout.php"><i class="fas fa-sign-out-alt"></i>登出</a>
        <?php if(isAdmin($user)) {?>
            <a class="board__btn" href="admin.php"><i class="fas fa-chalkboard-teacher"></i>後臺管理</a>
        <?php }?>
        <span class="board__btn update__nickname"><i class="fas fa-user-edit"></i>編輯暱稱</span>
        <form action="update_user.php" method="POST" class="hidden board__nickname-form">
            <div class="board__nickname">
                <span>新的暱稱：</span>
                <input type="text" name="nickname" placeholder="請輸入新的暱稱" class="board__input">
            </div>
            <input class="board__submit-btn" type="submit" />        
        </form>
        <h3>Hello <?php echo escape($user['nickname'])?> </h3>
    <?php } ?>
        <h1 class="board__title">留言板</h1>
        <?php 
        if(!empty($_GET['errCode'])){
            $code = $_GET['errCode'];
            $msg = 'ERROR';
            if($code === '1') {
                $msg = '請輸入內容才能送出';
            };
            echo '<h2 class="error">錯誤：' . $msg . '</h2>';
        };
        ?>
        <form action="handle_add_comment.php" method="POST">
            <textarea name="content" rows="5" placeholder="此言論不代表本台立場"></textarea>
        <?php if($username && !hasPermission($user, 'create', NULL)) { ?>
            <h3>你已被停權</h3>
        <?php } else if($username) { ?>
            <input type="submit" class="board__submit-btn" value="送出">
        <?php } else{ ?>
            <h3>請先登入才能留言</h3>
        <?php } ?>
        </form>
        <div class="board__hr"></div>
        <section>
        <?php while($row = $result->fetch_assoc()){ ?>
            <div class="card">
                <div class="card__avatar"></div>
                <div class="card__body">
                    <div class="card__info">
                        <span class="card__author">
                            <?php echo escape($row['nickname']) ?>
                            (@<?php echo escape($row['username']) ?>)
                        </span>
                        <span class="card__time">
                            <?php echo escape($row['created_at']) ?>
                        </span>
                        <?php if (!empty($username)){
                            if(isAdmin($user) || $username === $row['username']){
                        ?>
                            <a href="update_comment.php?id=<?php echo $row['id']?>"><i class="fas fa-edit"></i></a>
                            <a href="delete_comment.php?id=<?php echo $row['id']?>"><i class="fas fa-trash-alt"></i></a>
                        <?php }}?>
                    </div>
                    <p class="card__content"><?php echo escape($row['content']) ?></p>
                </div>
            </div>
        <?php } ?>
        </section>
        <div class="board__hr"></div>
            <?php 
                $stmt = $conn->prepare(
                    "SELECT count(id) as count FROM impala8012_comments WHERE is_deleted is NULL"
                );
                $result = $stmt->execute();
                $result = $stmt->get_result();
                $row = $result->fetch_assoc();
                $count = $row['count'];
                $total_page = ceil($count / $item_per_page);
            ?>
        <div class="page-info">
            <span>總共有 <?php echo $count?> 筆留言</span>
            <span>目前分頁<?php echo $page?> / <?php echo $total_page?></span>
        </div>

        <div class="paginator">
            <?php if($page != 1 ){ ?>
                <a href="index.php?page=1">首頁</a>
                <a href="index.php?page=<?php echo $page - 1?>">上一頁</a>
            <?php }?>
            <?php if($page != $total_page ){ ?>
                <a href="index.php?page=<?php echo $page + 1?>">下一頁</a>
                <a href="index.php?page=<?php echo $total_page?>">最後一頁</a>
            <?php } ?>
        </div>
    </main>
    <script>
        const btn = document.querySelector('.update__nickname');
        btn.addEventListener('click', function() {
            const form = document.querySelector('.board__nickname-form');
            form.classList.toggle('hidden');
        });
    </script>
</body>
</html>