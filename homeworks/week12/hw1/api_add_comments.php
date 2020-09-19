<?php
    require_once('conn.php');
    // 輸入回覆的的 response 為 JSON 格式的資料
    header('Content-type:application/json;charset=utf-8');
    // 處理跨網域存取，一般會限定是哪一個網域
    header('Access-Control-Allow-Origin: *');
    if(
        empty($_POST['content']) ||
        empty($_POST['nickname']) ||
        empty($_POST['site_key']) 
    ) {
        $json = array(
            "ok" => false,
            "message" => "PLEZ fill in the missing fields"
        );
        // 轉成JSON 格式
        $response = json_encode($json);
        echo $response;
        die();
    }

    $nickname = $_POST['nickname'];
    $content = $_POST['content'];
    $site_key = $_POST['site_key'];

    $sql = 'INSERT INTO impala8012_discussions(site_key, nickname, content) VALUES (?,?,?)';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sss', $site_key, $nickname, $content);
    $result = $stmt->execute();

    // 錯誤處理
    if(!$result) {
        $json = array(
            "ok" => false,
            "message" => $conn->error
        );
        $response = json_encode($json);
        echo $response;
        die();
    }
    // 成功處理，前端判斷是否為true 即可知道有沒有成功
    $json = array(
        "OK" => true,
        "message" => "success"
    )
?>