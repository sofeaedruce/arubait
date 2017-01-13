<?php 
	require_once 'connection.php';

	$sql = "SELECT * FROM job_category";
	$rs = mysql_query($sql, $conn) or die(mysql_error());

	while($row = mysql_fetch_array($rs)){
		$work = $row['category_desc'];
		$workID = $row['category_id'];
		
		echo '<div class="col-50 ">';
		echo '<div class="card ks-facebook-card">';
		echo '<a href="list_work.html?id='.$workID.'">';
		echo '<div class="card-content">';
		echo '<div class="card-content-inner">';
		echo '<img src="'.$row['category_picture'].'" width="100%">';
		echo '<p class="color-gray " >'.$work.'</p>';
		echo '</div>';
		echo '</div>';
		echo '</a>';
		echo '</div>';
		echo '</div>';
	}

?>