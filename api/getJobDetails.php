<?php 
	require_once 'connection.php';
	
	$id = $_GET['id'];
	$sql = "	
			SELECT * 
			FROM 
				job_offered,
				user_profile,
				job_category,
				job_picture
			WHERE 
				job_offered.job_id = '$id' AND  
				job_offered.user_email = user_profile.user_email AND 
				job_picture.job_id = '$id' AND 
				job_category.category_id = job_offered.category_id
			";
	
	$rs = mysql_query($sql, $conn) or die(mysql_error());
	$data = array();
	while($row = mysql_fetch_array($rs)){
		array_push($data, array(
			'work' => $row['job_desc'],
			'address' => $row['job_address'],
			'fullname' => $row['user_fullname'],
			'salary' => $row['job_salary'],
			'cat_desc' => $row['category_desc'],
			'pic' => $row['pic_url'],
			'pic2' => $row['pic2_url'],
			'pic3' => $row['pic3_url'],
			'date' => $row['job_date_work'],
			'status' => $row['job_status'],
			'details' => $row['job_details'],
			'id' => $row['job_id'],
			'user_email' => $row['user_email'],
			'user_pic' => $row['user_pic']
		));
	}
	echo json_encode($data); 
?>