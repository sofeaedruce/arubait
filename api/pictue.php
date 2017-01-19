<?php 
	require_once 'connection.php';

	$user_email = 'ayam';
	
	define('DIRECTORY', '/img');
	$image = file_get_contents('http://lh4.googleusercontent.com/-osJvbCK1UJU/AAAAAAAAAAI/AAAAAAAAABA/YVSj4X64WAo/s96-c/photo.jpg');
	file_put_contents(DIRECTORY . '/ayam.jpg', $image);
	echo $image; 



	
?>