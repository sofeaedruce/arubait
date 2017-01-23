<?php 
	require_once 'connection.php';

	$job_id = $_GET['id'];
	
	$query = " 
				UPDATE job_offered 
					(job_status)
				SET 
					job_status = 'cancelled' 
				WHERE 
					job_id = '$job_id' 
	";
				    
	$rs = mysql_query($query, $conn) or die(mysql_error());
?>