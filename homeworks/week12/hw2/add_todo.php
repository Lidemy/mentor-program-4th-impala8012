<?php
    require_once('conn.php');
    // 輸入回覆的的 response 為 JSON 格式的資料
    header('Content-type:application/json;charset=utf-8');
    // 處理跨網域存取，一般會限定是哪一個網域
    header('Access-Control-Allow-Origin: *');
    if(
        empty($_POST['todo']) 
    ) {
        $json = array(
            "ok" => false,
            "message" => "PLEZ input missing fields"
        );
        // 轉成JSON 格式
        $response = json_encode($json);
        echo $response;
        die();
    }

    $todo = $_POST['todo'];

    $sql = 'INSERT INTO impala8012_todos(todo) VALUES (?)';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $todo);
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
        "message" => "success",
        "id" => $conn->insert_id,
    );
    $response = json_encode($json);
    echo $response;
    die();
?>