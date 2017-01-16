<?php 
	require_once 'connection.php';
	
	$user_email = $_POST['user_email'];
	$employer_email = $_POST['employer_email'];
	
	
	$query = "INSERT INTO follow (employer_email,user_email,follow_status)
					VALUES ('$employer_email','$user_email','1') 
						ON DUPLICATE KEY UPDATE follow_status = !follow_status ";
				    
	$rs = mysql_query($query, $conn) or die(mysql_error());
?>