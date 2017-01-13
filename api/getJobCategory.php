<?php 
	require_once 'connection.php';
	
	$sql = "SELECT * FROM job_category ";
	
	$rs = mysql_query($sql, $conn) or die(mysql_error());
	$data = array();
	while($row = mysql_fetch_array($rs)){
		array_push($data, array(
			'cat_id' => $row['category_id'],
			'cat_desc' => $row['category_desc']
		));
	}
	echo json_encode($data); 
?>