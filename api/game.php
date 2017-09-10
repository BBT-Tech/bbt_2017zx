<?php
header('Content-Type: application/json');
require_once('./config.php');

$request = json_decode(file_get_contents('php://input'), true);
if (isset($request['isPassed']) && isset($request['passedRecord'])) {
	if ($request['isPassed'] && substr($request['passedRecord'], 246, 1) === '1')
		if (!($connect->query('
			UPDATE `game`
			SET
			`passed_number` = `passed_number` + 1')))
			response(1, '更新数据失败');

	if (!($connect->query('
		UPDATE `game`
		SET
		`participate_number` = `participate_number` + 1')))
		response(2, '更新数据失败');
}

$stmt = $connect->prepare('
       SELECT *
       FROM `game`');
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
if (empty($result)) response(3, '获取数据失败');

echo json_encode(array( 'code' => 0, 'passedNo' => $result[0]['passed_number'], 'total' => $result[0]['participate_number']));
