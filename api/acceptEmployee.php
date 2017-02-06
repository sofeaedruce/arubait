<?php 
	require_once 'connection.php';
	
	$user_email = $_GET['user_email'];
	$login_email = $_GET['login_email'];
	$job_id = $_GET['job_id'];
	$noti_target = 'no';
	
	$query = "UPDATE job_applied SET 
					status='accepted' 
				WHERE 
					user_email = '$user_email' AND 
					job_id = '$job_id' 
					";
	
	$query2 = "INSERT INTO notification(
					noti_desc, 
					job_id, 
					noti_target, 
					user_email) 
				VALUES (
					'Application for $job_id has been Accepted',
					'$job_id',
					'$noti_target',
					'$user_email') 
					
				";
					
	$rs = mysql_query($query, $conn) or die(mysql_error());
	$rs = mysql_query($query2, $conn) or die(mysql_error());
?>