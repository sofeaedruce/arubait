<?php 
	require_once 'connection.php';
	
	$login_email = $_GET['login_email'];
	$sql = "
		SELECT *
		FROM user_profile,follow
		WHERE follow.user_email = '$login_email' AND follow.employer_email = user_profile.user_email
	";
	
	$rs = mysql_query($sql, $conn) or die(mysql_error());
	$data = array();
	while($row = mysql_fetch_array($rs)){
		array_push($data, array(
			'fullname' => $row['user_fullname'],
			'user_pic' => $row['user_pic'],
			'user_email' => $row['user_email']
		));
	}
	echo json_encode($data); 
?>