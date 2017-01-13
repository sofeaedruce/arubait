<?php 
	require_once 'connection.php';

	$user_fullname = $_POST['user_fullname'];
	$user_pic = $_POST['user_pic'];
	$user_email = $_POST['user_email'];

	$query = "INSERT INTO user_profile (user_fullname,user_pic,user_email)
					VALUES ('$user_fullname','$user_pic','$user_email') 
						ON DUPLICATE KEY UPDATE user_pic = '$user_pic', user_fullname = '$user_fullname' ";
	
	$rs = mysql_query($query, $conn) or die(mysql_error());
?>