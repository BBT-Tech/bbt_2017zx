<?php

//Database Configurations:
$addr = 'localhost';			//Database Address
$dbname = 'autumn_recruit_2017';		//Database Name
$user = 'db_user_name';					//Username for Project Database
$password = 'corresponding_password';		//Password for Project Database

//Database Connection based on PDO:
try {
	$connect = new PDO("mysql:host=$addr;dbname=$dbname;charset=utf8", $user, $password);
} catch(PDOException $ex) {
    response(2333, '数据库连接出错，请联系管理员');
    exit(0);
}



//Return Code Process Function:
function response($code, $errMsg = 'Success') {
	echo json_encode(array('code' => $code, 'errMsg' => $errMsg));
	exit(0);
}

//Check whether required paraments exist or not
function existCheck() {
	for($i = 0; $i < func_num_args(); $i++) {
		if (!isset($_POST[func_get_arg($i)])) {
			header('Location: http://p1.img.cctvpic.com/20120409/images/1333902721891_1333902721891_r.jpg');
			exit(0);
		}
	}
}

//Check if necessary paraments are blank
//Note: Uncommet the '=== 0' condition if necessary
function blankCheck() {
	for($i = 0; $i < func_num_args(); $i++) {
		if (($_POST[func_get_arg($i)] == '')/* OR ($_POST[func_get_arg($i)] === 0)*/) {
			response(233, '必填项中含有空值');
			exit(0);
		}
	}
}
