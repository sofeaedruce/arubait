<?php 
	require_once 'connection.php';
	
	$id = $_GET['id'];
	$sql = "
			SELECT DISTINCT * 
			FROM 
				job_offered,
				user_profile,
				job_applied,
				job_category
			WHERE 
				job_applied.user_email = '$id' AND 
				user_profile.user_email = '$id' AND 
				job_category.category_id = job_offered.category_id AND 
				job_offered.job_id = job_applied.job_id
			";
	
	$rs = mysql_query($sql, $conn) or die(mysql_error());
	$data = array();
	while($row = mysql_fetch_array($rs)){
		array_push($data, array(
			'work' => $row['job_desc'],
			'date' => $row['job_date_work'],
			'cat_desc' => $row['category_desc'],
			'details' => $row['job_details'],
			'status' => $row['job_status'],
			'id' => $row['job_id'],
			'user_pic' => $row['user_pic']
		));
	}
	echo json_encode($data); 
?>