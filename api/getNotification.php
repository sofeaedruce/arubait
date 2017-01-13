<?php 
	require_once 'connection.php';
	
	$sql = "
			SELECT * 
			FROM 
				notification
			WHERE 
				notification.user_email = ".$_GET['id']."
			";
			
	$rs = mysql_query($sql, $conn) or die(mysql_error());
	$data = array();
	while($row = mysql_fetch_array($rs)){
		array_push($data, array(
			'desc' => $row['noti_desc']
		));
	}
	echo json_encode($data); 
?>