<?php 
	require_once 'connection.php';
	
	$user_email = $_GET['id'];
	$login_email = $_GET['login_email'];
	$sql = "
		SELECT
			(SELECT COUNT(1) FROM job_applied WHERE job_applied.user_email = user_profile.user_email) apply,
			(SELECT COUNT(1) FROM job_offered WHERE job_offered.user_email = user_profile.user_email) offer,
			(SELECT COUNT(1) FROM follow WHERE follow.user_email = user_profile.user_email) follow,
			(SELECT IF(follow_status=1,'unfollow','follow') FROM follow WHERE follow.user_email = '$login_email' AND follow.employer_email = '$user_email') follow_status,
			user_fullname, user_pic, user_email
		FROM user_profile
		WHERE user_email = '$user_email'
	";
	
	$rs = mysql_query($sql, $conn) or die(mysql_error());
	$data = array();
	while($row = mysql_fetch_array($rs)){
		array_push($data, array(
			'fullname' => $row['user_fullname'],
			'apply' => $row['apply'],
			'follow' => $row['follow'],
			'follow_status' => $row['follow_status'],
			'offer' => $row['offer'],
			'user_pic' => $row['user_pic'],
			'user_email' => $row['user_email']
		));
	}
	echo json_encode($data); 
?>