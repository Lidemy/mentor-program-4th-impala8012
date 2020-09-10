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
        $nickname = $user['nickname'];
    };

    if($user === NULL || $user['role'] !== 'admin') {
        header('Location:index.php');
        exit();
    }
    $stmt = $conn->prepare("select id, role, username, nickname from impala8012_users order by id asc ");
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
    <title>後台管理</title>
</head>
<body>
    <header class="warning">
        <strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
    </header>

    <main class="admin-board">
        <h3 class="admin-title">後臺管理</h3>
        <a class="board__btn backstage__btn" href="index.php"><i class="fas fa-sign-out-alt"></i>回首頁</a>
        <a class="board__btn backstage__btn" href="logout.php"><i class="fas fa-sign-out-alt"></i>登出</a>

        <table>
            <tr>
                <th>id</th>
                <th>role</th>
                <th>username</th>
                <th>nickname</th>
                <th>role update</th>
            </tr>
        <?php while($row = $result->fetch_assoc()){ ?>
            <tr>
                <td><?php echo escape($row['id'])?></td>
                <td><?php echo escape($row['role'])?></td>
                <td><?php echo escape($row['username'])?></td>
                <td><?php echo escape($row['nickname'])?></td>
                <td>
                    <form method="POST" action="handle_update_role.php?id=<?php echo escape($row['id']) ?>">
                        <select name="role">
                            <option value="admin" <?php echo is_selected($row, 'admin')?>>管理員</option>
                            <option value="user" <?php echo is_selected($row, 'user')?>>一般會員</option>
                            <option value="banned" <?php echo is_selected($row, 'banned')?>>停權會員</option>
                        </select>
                        <input type="submit" class="board__btn">
                 </form>
                    <!-- <a href="handle_update_role.php?role=admin&id=<?php echo escape($row['id'])?>">管理員</a>
                    <a href="handle_update_role.php?role=user&id=<?php echo escape($row['id'])?>">一般會員</a>
                    <a href="handle_update_role.php?role=banned&id=<?php echo escape($row['id'])?>">停權會員</a> -->
                </td>
            </tr>
        <?php } ?>
        </table>
        </section>
    </main>
</body>
</html>