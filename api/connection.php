<?php
	error_reporting(E_ALL & ~E_DEPRECATED & ~E_NOTICE);
	$conn = mysql_connect('localhost', 'root', '') or die("");
	mysql_select_db('arubait', $conn);
	mysql_query("SET time_zone = 'Asia/Kuala_Lumpur'");
?>