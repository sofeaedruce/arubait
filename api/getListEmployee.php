<?php 
	require_once 'connection.php';
	
	$login_email = $_GET['login_email'];
	$job_id = $_GET['id'];
	$sql = "
		SELECT *
		FROM user_profile,job_applied
		WHERE job_applied.user_email = user_profile.user_email AND job_applied.job_id = '$job_id'
	";
	
	$rs = mysql_query($sql, $conn) or die(mysql_error());
	$data = array();
	while($row = mysql_fetch_array($rs)){
		array_push($data, array(
			'fullname' => $row['user_fullname'],
			'user_pic' => $row['user_pic'],
			'user_email' => $row['user_email'],
			'job_id' => $row['job_id'],
			'status' => $row['status']
		));
	}
	echo json_encode($data); 
?>