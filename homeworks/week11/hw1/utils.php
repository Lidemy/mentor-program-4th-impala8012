<?php
    require_once('conn.php');

    function getUserFromUsername($username){
        global $conn;
        $sql = sprintf(
            "SELECT * FROM impala8012_users WHERE username = '%s'",
            $username
        );
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();
        return $row;
    };

    function escape($str) {
        return htmlspecialchars($str, ENT_QUOTES);
    }

    function isAdmin($user) {
        return $user['role'] === 'admin';
    }

    function hasPermission($user, $action, $comment) {
        if($user['role'] === 'admin') {
            return true;
        }

        if($user['role'] === 'user') {
            if($action === 'create') return true;
            return $comment['username'] === $user['username'];
        }

        if($user['role'] === 'banned') {
            return $action !== 'create';
        }
    }

    function is_selected($row, $role){
        if ($row['role'] === $role) {
          return 'selected';
        }
    }
?>