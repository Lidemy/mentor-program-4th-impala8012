<?php
    require_once('conn.php');
    // 輸入回覆的的 response 為 JSON 格式的資料
    header('Content-type:application/json;charset=utf-8');
    // 處理跨網域存取，一般會限定是哪一個網域
    header('Access-Control-Allow-Origin: *');

    // site_Key 來區分不同的留言板
    if(
        empty($_GET['site_key'])
        ){
        $json = array(
            "ok" => false,
            "message" => "plez send sitekey in URL"
        );
        // 轉成JSON 格式
        $response = json_encode($json);
        echo $response;
        die();
    };
    $site_key = $_GET['site_key'];

    $sql = "SELECT * FROM impala8012_discussions WHERE site_key=? ". 
    (empty($_GET['before']) ? '' : "AND id < ? ").
    "ORDER BY id DESC limit 5";
    $stmt = $conn->prepare($sql);
    if(empty($_GET['before'])) {
        $stmt->bind_param('s', $site_key);
    } else {
        $stmt->bind_param('si', $site_key, $_GET['before']);
    };
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
    };
    $result = $stmt->get_result();
    $contents = array();
    while($row = $result->fetch_assoc()){
        array_push($contents, array(
            "id" => $row['id'],
            "nickname" => $row['nickname'],
            "content" => $row['content'],
            "created_at" => $row['created_at'],
        ));
    }
    // 成功處理，產生一個物件，前端判斷是否為true 即可知道有沒有成功
    $json = array(
        "ok" => true,
        "contents" => $contents
    );
    $response = json_encode($json);
    echo $response;
?>