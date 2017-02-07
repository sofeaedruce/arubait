<?php 
	require_once 'connection.php';
	
	$user_email = $_GET['login_email'];
	$sql = "
			SELECT COUNT(user_email) AS noti FROM notification WHERE user_email = '$user_email' AND noti_status = 'UNREAD'
			";
			
	$rs = mysql_query($sql, $conn) or die(mysql_error());
	$data = array();
	while($row = mysql_fetch_array($rs)){
		array_push($data, array(
			'noti' => $row['noti']
		));
	}
	echo json_encode($data); 
?>