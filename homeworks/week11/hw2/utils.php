<?php
    require_once('conn.php');
    function escape($str) {
        return htmlspecialchars($str, ENT_QUOTES);
    };

    function getCategories() {
      global $conn;
      $stmt = $conn->prepare('SELECT * FROM impala8012_blog_categories ORDER BY created_at ASC');
      $result = $stmt->execute();
      $result = $stmt->get_result();
      if (!$result) {
        die($conn->error);
      }
      return $result;
    };
?>