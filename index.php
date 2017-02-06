<?php
//Include GP config file && User class
include_once 'api/gpConfig.php';
include_once 'api/User.php';

if(isset($_GET['code'])){
	$gClient->authenticate($_GET['code']);
	$_SESSION['token'] = $gClient->getAccessToken();
	header('Location: ' . filter_var($redirectURL, FILTER_SANITIZE_URL));
}

if (isset($_SESSION['token'])) {
	$gClient->setAccessToken($_SESSION['token']);
}

if ($gClient->getAccessToken()) {
	//Get user profile data from google
	$gpUserProfile = $google_oauthV2->userinfo->get();
	
	//Initialize User class
	$user = new User();
	
	//Insert or update user data to the database
    $gpUserData = array(
        'oauth_provider'=> 'google',
        'oauth_uid'     => $gpUserProfile['id'],
        'first_name'    => $gpUserProfile['given_name'],
        'last_name'     => $gpUserProfile['family_name'],
        'email'         => $gpUserProfile['email'],
        'gender'        => $gpUserProfile['gender'],
        'locale'        => $gpUserProfile['locale'],
        'picture'       => $gpUserProfile['picture'],
        'link'          => $gpUserProfile['link']
    );
    $userData = $user->checkUser($gpUserData);
	
	//Storing user data into session
	$_SESSION['userData'] = $userData;
	
	//Render facebook profile data
    if(!empty($userData)){
        $output = '<h1>Google+ Profile Details </h1>';
        $output .= '<img src="'.$userData['picture'].'" width="300" height="220">';
        $output .= '<br/>Google ID : ' . $userData['oauth_uid'];
        $output .= '<br/>Name : ' . $userData['first_name'].' '.$userData['last_name'];
        $output .= '<br/>Email : ' . $userData['email'];
        $output .= '<br/>Gender : ' . $userData['gender'];
        $output .= '<br/>Locale : ' . $userData['locale'];
        $output .= '<br/>Logged in with : Google';
        $output .= '<br/><a href="'.$userData['link'].'" target="_blank">Click to Visit Google+ Page</a>';
        $output .= '<br/>Logout from <a href="logout.php">Google</a>'; 
    }else{
        $output = '<h3 style="color:red">Some problem occurred, please try again.</h3>';
    }
} else {
	$authUrl = $gClient->createAuthUrl();
	$output = '<a href="'.filter_var($authUrl, FILTER_SANITIZE_URL).'"><img src="images/glogin.png" alt=""/></a>';
}
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="google-signin-client_id" content="183428887100-111qbjt3c4onishskm1tnbohunhgu8u3.apps.googleusercontent.com">
    <!-- Color theme for statusbar -->
    <meta name="theme-color" content="#f66c26">
    <title>Arubait</title>
    <link rel="stylesheet" href="css/framework7.material.css">
    <link rel="stylesheet" href="css/framework7.material.colors.css">
	 <link rel="stylesheet" href="font-awesome-4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/default-style.css">
    <link rel="stylesheet" href="css/my-app.css">
    <link href="css/css.css" rel="stylesheet" type="text/css">
    <link rel="shortcut icon" href="img/arubait_icon.png" type="image/x-icon" />
    <link rel="apple-touch-icon" href="img/arubait_icon.png">
    <link rel="apple-touch-icon-precomposed" href="img/arubait_icon.png">
</head>
<body>
    <div class="panel-overlay"></div>
    <div class="views">
        <div class="view view-main">
            <div class="pages navbar-fixed">
                <div data-page="index" class="page">
                    <div class="page-content">
                        <div class="image-background">
                            <img src="img/post3.jpg">
                        </div>
                        <div class="content-block row ">
                            <div class="col-100 tablet-100">
                                <div class="content-block row ">
                                    <div class="col-100 tablet-100">
                                        <p class="title">
                                            <img src="img/Arubait_logo.png">
                                        </p>
                                        <div class="content-block row ">
                                            <div class="col-100">
                                                <div><?php echo $output; ?></div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="picker-modal-overlay"></div>
    <script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="js/framework7.min.js"></script>
    <script type="text/javascript" src="js/my-app.js"></script>
    <script src="js/platform.js" async defer></script>
</body>
</html>       