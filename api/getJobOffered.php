<?php 
	require_once 'connection.php';
	
	$id = $_GET['id'];
	$sql = "
			SELECT * 
			FROM 
				job_offered,
				user_profile,
				job_category
			WHERE 
				job_offered.user_email = '$id' AND 
				user_profile.user_email = '$id' AND 
				job_category.category_id = job_offered.category_id ";
	
	$rs = mysql_query($sql, $conn) or die(mysql_error());
	$data = array();
	while($row = mysql_fetch_array($rs)){
		array_push($data, array(
			'work' => $row['job_desc'],
			'date' => $row['job_date_work'],
			'cat_desc' => $row['category_desc'],
			'details' => $row['job_details'],
			'status' => $row['job_status'],
			'id' => $row['job_id']
		));
	}
	echo json_encode($data); 
?>