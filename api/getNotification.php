<?php 
	require_once 'connection.php';
	
	$user_email = $_GET['login_email'];
	$sql = "
			SELECT * 
			FROM 
				notification,user_profile,job_offered
			WHERE 
				notification.user_email = '$user_email' AND
				notification.job_id = job_offered.job_id   AND
				job_offered.user_email = user_profile.user_email 
			";
			
	$rs = mysql_query($sql, $conn) or die(mysql_error());
	$data = array();
	while($row = mysql_fetch_array($rs)){
		array_push($data, array(
			'desc' => $row['noti_desc'],
			'job_desc' => $row['job_desc'],
			'user_pic' => $row['user_pic']
		));
	}
	echo json_encode($data); 
?>