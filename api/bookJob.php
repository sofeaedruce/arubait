<?php 
	require_once 'connection.php';

	$job_id = $_GET['id'];
	$user_email = $_GET['login_email'];

	$query = "INSERT INTO book (job_id,user_email,book_status)
				VALUES ($job_id,$user_email,'1') 
				ON DUPLICATE KEY UPDATE book_status = !book_status ";
	
    
      $rs = mysql_query($query, $conn) or die(mysql_error());
?>
