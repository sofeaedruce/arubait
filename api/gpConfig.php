<?php
session_start();

//Include Google client library 
include_once 'src/Google_Client.php';
include_once 'src/contrib/Google_Oauth2Service.php';

/*
 * Configuration and setup Google API
 */
$clientId = '183428887100-j3onrsbtpf5sbqoobp4pj23bu1d2i9d2.apps.googleusercontent.com'; //Google client ID
$clientSecret = 'W3XcVARFr5sQp3LDfwO-O1L1'; //Google client secret
$redirectURL = 'http://localhost/arubait/'; //Callback URL

//Call Google API
$gClient = new Google_Client();
$gClient->setApplicationName('Login to Arubait.com');
$gClient->setClientId($clientId);
$gClient->setClientSecret($clientSecret);
$gClient->setRedirectUri($redirectURL);

$google_oauthV2 = new Google_Oauth2Service($gClient);
?>