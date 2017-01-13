<?php 
	require_once 'connection.php';

	$job_id = $_GET['id'];
	$user_email = $_GET['email'];

	$query = "
				INSERT INTO 
					job_applied (job_id,user_email)
				VALUES 
					('$job_id','$user_email') 
				";
				    
	$query2 = "
				UPDATE job_offered 
					(job_status)
				SET 
					job_status = 'applied' 
				WHERE 
					job_id = '$job_id' 
				";
				    
	$rs = mysql_query($query, $conn) or die(mysql_error());
	$rs = mysql_query($query2, $conn) or die(mysql_error());
?>