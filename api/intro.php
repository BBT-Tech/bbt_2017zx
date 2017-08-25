<?php
header('Content-Type: application/json');
require_once('./config.php');

$index = 0;

foreach($connect->query('
	SELECT *
	FROM `departments`
	ORDER BY ID ASC') as $department) {
	$departments[$index] = array(
		'id' => (int)$department['ID'],
		'name' => $department['name'],
		'img' => $department['img'],
		'description' => $department['description']);
	$index++;
}
if (empty($departments)) response(1, '获取数据失败，请联系管理员');

echo json_encode(array('code' => 0, 'departments' => $departments));
