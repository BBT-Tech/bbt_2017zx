<?php
header('Content-Type: application/json');
require_once('./config.php');

existCheck('name', 'gender', 'college', 'grade', 'dorm', 'tel', 'department1', 'department2', 'adjust', 'intro');
blankCheck('name', 'gender', 'college', 'grade', 'dorm', 'tel', 'department1', 'adjust');

$sql = '
INSERT INTO `register`
(`name`, `gender`, `college`, `grade`, `dorm`, `tel`, `department1`, `department2`, `adjust`, `intro`)
VALUES
(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
';
$stmt = $connect->prepare($sql);
$stmt->execute(array(
	$_POST['name'],
	$_POST['gender'],
	$_POST['college'],
	$_POST['grade'],
	$_POST['dorm'],
	$_POST['tel'],
	$_POST['department1'],
	$_POST['department2'],
	$_POST['adjust'],
	$_POST['intro']));

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
if (!empty($result)) response(1, '写入数据库失败');

response(0);
