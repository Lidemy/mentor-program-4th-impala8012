<?php
    require_once('conn.php');

    function getUserFromUsername($username){
        global $conn;
        $sql = sprintf(
            "SELECT * FROM users WHERE username = '%s'",
            $username
        );
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();
        return $row;
    };
?>