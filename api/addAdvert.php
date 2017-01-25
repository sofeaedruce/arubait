<?php
	require_once 'connection.php';

	$job_desc = $_POST['job_desc'];	
	$job_salary = $_POST['job_salary'];	
	$job_date_work = $_POST['job_date_work'];	
	$job_address = $_POST['job_address'];
	$category_id = $_POST['category_id'];
	$job_details = $_POST['job_details'];
	$user_email = $_POST['user_email'];
	$job_pic1 = $_POST['job_pic1'];
	$job_pic2 = $_POST['job_pic2'];
	$job_pic3 = $_POST['job_pic3'];
	
	$query = "INSERT INTO job_offered (
					job_desc,
					job_salary,
					job_date_work,
					job_address,
					category_id,
					job_details,
					user_email,
					job_date_post,
					job_pic1,
					job_pic2,
					job_pic3)
				VALUES (
					'$job_desc',
					'$job_salary',
					'$job_date_work',
					'$job_address',
					'$category_id',
					'$job_details',
					'$user_email',
					now(),
					'$job_pic1',
					'$job_pic2',
					'$job_pic3') 
			";
				    
    $rs = mysql_query($query, $conn) or die(mysql_error());
      
?>
