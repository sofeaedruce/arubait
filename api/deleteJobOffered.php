<?php 
	require_once 'connection.php';

	$job_id = $_GET['id'];
	$user_email = $_GET['login_email'];
	
	$query = "DELETE FROM job_offered WHERE job_id = $job_id AND user_email = '$user_email' ";
				    
	$rs = mysql_query($query, $conn) or die(mysql_error());
?>