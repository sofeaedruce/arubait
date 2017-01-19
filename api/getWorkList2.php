<?php 
	require_once 'connection.php';
	
	$id = $_GET['id'];
	$user_email = $_GET['login_email'];
	$sql = "
			SELECT *
			FROM 
				job_offered,user_profile,job_category
			WHERE 
				job_offered.category_id LIKE '%{$id}%' AND 
				job_category.category_id LIKE '%{$id}%' AND 
				job_offered.user_email = user_profile.user_email AND
				NOT EXISTS(SELECT * FROM job_applied WHERE job_applied.job_id = job_offered.job_id AND user_email = '$user_email')
			";
	
	$rs = mysql_query($sql, $conn) or die(mysql_error());
	$data = array();
	while($row = mysql_fetch_array($rs)){
		array_push($data, array(
			'work' => $row['job_desc'],
			'address' => $row['job_address'],
			'fullname' => $row['user_fullname'],
			'salary' => $row['job_salary'],
			'desc' => $row['category_desc'],
			'pic' => $row['job_pic1'],
			'user_pic' => $row['user_pic'],
			'id' => $row['job_id'],
			'user_email' => $row['user_email']
		));
	}
	echo json_encode($data); 
?>