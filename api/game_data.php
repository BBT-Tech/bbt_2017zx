<?php
header('Content-Type: application/json');
require_once('./config.php');

$stmt = $connect->prepare('
	SELECT *
	FROM `game`');
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
if (empty($result)) response(1, '获取数据失败');

echo json_encode(array( 'code' => 0, 'passedNo' => $result[0]['passed_number'], 'total' => $result[0]['participate_number']));
