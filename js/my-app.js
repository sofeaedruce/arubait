// Init App
var myApp = new Framework7({
    //    modalTitle: 'Pepin',
    // Enable Material theme
    material: true,
    cache: true,
    materialRipple: true,
    scrollTopOnNavbarClick: true
});

// Expose Internal DOM library
var $$ = Dom7;

// Add main view
var mainView = myApp.addView('.view-main', {});

// GENERAL


$$('a').on('click', function (e) { //Close panel when you open a new page
    myApp.closePanel();
});

$$('a.home').on('click', function (e) { //Close popover when you open a new page
    myApp.closeModal('.popover-more-home');
});
$$('a.more').on('click', function (e) { //Close popover when you open a new page
    myApp.closeModal('.popover-more');
});

$$(document).on('click', '.alert-text', function () {
    myApp.modal({
        title: 'Forgot Password ?',
        text: 'Please enter your email',
        afterText: '<input type="text" class="modal-text-input" placeholder="Your email">',
        buttons: [{
            text: 'OK',
            //            onClick: function () {
            //                myApp.alert('You clicked Ok!');
            //            }
    }, {
            text: 'Cancel',
            //            onClick: function () {
            //                myApp.alert('You clicked Cancel!');
            //            }
    }, ]
    });
});

$$(document).on('click', '.logout', function () {
    myApp.modal({
        title: 'Are sure want to exit ?',
        buttons: [{
            text: 'OK',
            onClick: function signOut() {
			var auth2 = gapi.auth2.getAuthInstance();
			auth2.signOut().then(function () {
				console.log('User signed out.');
				window.open("index.html","_self");
			});
		}
    }, {
            text: 'Cancel',
            //            onClick: function () {
            //                myApp.alert('You clicked Cancel!');
            //            }
    }, ]
    });
});

$$(document).on('click', '.book', function () {
    $(this).toggleClass('color-change')
});

$$(document).on('pageInit', function (e) {
    // Do something here when page loaded and initialized
    var mySwiper = myApp.swiper('.swiper-container.swiper-init', {
        pagination: '.swiper-pagination',
        paginationHide: false,
        autoplay: 3000,
        onReachEnd: function (swiper) {
            //callback function code here
        }
    });

});

// ICONS TRANSITIONS

$$('i.material-icons.fav').on('click', function (e) { //Changing color icons onclick
    $$(this).toggleClass('color-change');
});


//---------------------------------------------------------------------------------------------------------------------------sopia punye-------------------------------------------------------------------------------------
var login_email = '';
var followStatus = '';
var bookStatus = '';
//var server_path = 'http://coralsoft.nc.com.my/arubait/';

myApp.onPageInit('home', function (page) {
	var url = window.location.href; 
	
	$.get("api/getWorkList.php", function( data ) {
	  $( ".work" ).html( data );
	});
	
	$.get("api/getJobApplied.php?id="+login_email, function( data ) {
		var list = '';
		data = JSON.parse(data);
		for (var i in data) {
			
			if (data[i].status == 'confirmed') {
				$( "#deleteJob" ).html("style","display:none;");
			}
			list +=
				'<li class="accordion-item">'+
					'<a href="#" class="item-link item-content">'+
						'<div class="item-inner">'+
							'<div class="item-media">'+
								'<img src="'+data[i].user_pic+'" width="44" style="margin-top: 5px;">'+
							'</div>'+
							'<div class="item-title-row" style="position: absolute; left: 62px;">'+
								'<div class="item-title">'+data[i].work+'</div>'+
								'<div class="item-after" style="margin-left: 0;">'+data[i].date+'</div>'+
							'</div>'+
							'<div class="item-subtitle"><span class="badge '+data[i].status+'">'+data[i].status+'</span></div>'+
						'</div>'+
					'</a>'+
					'<div class="accordion-item-content" style="">'+
						'<div class="list-block">'+
							'<article>'+
								'<div class="card ks-card-header-pic">'+
									'<div class="card-footer">'+
										'<div class="col-100">'+
											'<div class="row">'+
												'<div class="col-100" style="text-align: left; font-weight: lighter;">Category</div>'+
												'<div class="col-100" style="text-align: left;font-weight: bold;">'+data[i].cat_desc+'</div>'+
											'</div>'+
											'<div class="row">'+
												'<div class="col-100" style="text-align: left; font-weight: lighter;">Description</div>'+
												'<div class="col-100" style="text-align: left;font-weight: bold;">'+data[i].details+'</div>'+
											'</div>'+
											'<div class="row">'+
												'<div class="col-100" style="text-align: left; margin-top: 10px;">'+
													'<a href="list_work_detail.html?id='+data[i].id+'">'+
														'<i class="material-icons" style="color: grey;">remove_red_eye</i>'+
													'</a>'+
													'<a href="#" onclick="deleteJobApplied('+data[i].id+')" id="deleteJob">'+
														'<i class="material-icons" style="color: #ff2c2c; margin-left: 10px;">delete</i>'+
													'</a>'+
												'</div>'+
											'</div>'+
										'</div>'+
									'</div>'+
								'</div>'+
							'</article>'+
						'</div>'+
					'</div>'+
				'</li>'
		}
		$( ".job_applied" ).html(list);
	});
	
	$.get("api/getJobOffered.php?id="+login_email, function( data ) {
		var list = '';
		data = JSON.parse(data);
		for (var i in data) {
			list +=
				'<li class="accordion-item">'+
					'<a href="#" class="item-link item-content">'+
						'<div class="item-inner">'+
							'<div class="item-title-row">'+
								'<div class="item-title">'+data[i].work+'</div>'+
								'<div class="item-after" style="margin-left: 0;">'+data[i].date+'</div>'+
							'</div>'+
							'<div class="item-subtitle"><span class="badge '+data[i].status+'">'+data[i].status+'</span></div>'+
						'</div>'+
					'</a>'+
					'<div class="accordion-item-content" style="">'+
						'<div class="list-block">'+
							'<article>'+
								'<div class="card ks-card-header-pic">'+
									'<div class="card-footer">'+
										'<div class="col-100" style="font-size: 3vmin;">'+
											'<div class="row">'+
												'<div class="col-100" style="text-align: left; font-weight: lighter;">Category</div>'+
												'<div class="col-100" style="text-align: left;font-weight: bold;">'+data[i].cat_desc+'</div>'+
											'</div>'+
											'<div class="row">'+
												'<div class="col-100" style="text-align: left; font-weight: lighter;">Description</div>'+
												'<div class="col-100" style="text-align: left;font-weight: bold;">'+data[i].details+'</div>'+
											'</div>'+
											'<div class="row">'+
												'<div class="col-100" style="text-align: left; margin-top: 10px;">'+
													'<a href="#">'+
														'<i class="material-icons" style="color: grey;">remove_red_eye</i>'+
													'</a>'+
													'<a href="#" onclick="deleteJobOffered('+data[i].id+')">'+
														'<i class="material-icons" style="color: #ff2c2c; margin-left: 10px;">delete</i>'+
													'</a>'+
													'<a href="list-employee.html">'+
														'<i class="material-icons" style="color: #ff2c2c; margin-left: 10px;">contacts</i>'+
													'</a>'+
												'</div>'+
											'</div>'+
										'</div>'+
									'</div>'+
								'</div>'+
							'</article>'+
						'</div>'+
					'</div>'+
				'</li>'
		}
		$( ".job_offered" ).html(list);
	});
	
	$.get("api/getProfileDetails.php?login_email="+login_email, function( data ) {
		var list = '';
		
		data = JSON.parse(data);
		$( ".fullname" ).html(data[0].fullname);
		$( ".offer" ).html(data[0].offer);
		$( ".apply" ).html(data[0].apply);
		$( ".follower" ).html(data[0].follow);
		$( ".user_pic" ).attr("src",data[0].user_pic);
	});
	
});

myApp.onPageInit('work-list', function (page) {
	var url = window.location.href; 
	$.get("api/getWorkList2.php?id="+page.url.split('=')[1]+"&login_email="+login_email, function( data ) {
		var list = '';
		var desc = '';
		data = JSON.parse(data);
		//console.log(data.length);
		for (var i in data) {
			desc = data[i].desc;
			list +=
				' <article> '+
					'<div class="card ks-card-header-pic"> '+
						 '<div class="navbar article">'+
							'<div class="navbar-inner opacity-container-top">'+
								'<div class="center"></div>'+
							'</div>'+
						 '</div>'+
						 '<div class="header-container" style="margin-top: -53px;">'+
							'<a href="list_work_aizal.html?id='+data[i].id+'">'+
								'<div style="background-image:url('+data[i].pic+')" valign="bottom" class="card-header color-white no-border"></div>'+
								'<div class="opacity-container" style="bottom:0px">'+
									'<div class="profile-info">'+
										'<div class="row no-gutter" style="text-align: left">'+
											'<div class="col-100 info" style="text-align: left; font-size: 5vmin; margin-bottom: 0px;">'+data[i].work+'</div>'+
										'</div>'+
									'<div class="row no-gutter">'+
										'<div class="col-100 stats" style="text-align: left; font-weight: lighter; font-size: 4vmin; margin-bottom: -5px;">'+data[i].address+'</div>'+
									'</div>'+
								'</div>'+
							 '</div>'+
							'</a>'+
						 '</div>'+
						 '<div class="card-footer">'+
							'<div class="item-media">'+
								'<a href="profile-worker.html?id='+data[i].user_email+'"><img src="'+data[i].user_pic+'" width="44" style="margin-top: 5px;"></a>'+
							'</div>'+
							'<div class="item-inner" style="margin-left: 20px">'+
								'<div class="row no-gutter" style="text-align: left;">'+
									'<a href="profile-worker.html?id='+data[i].user_email+'">'+
										'<div class="col-100 info" style="text-align: left; font-size: 3vmin; margin-bottom: -10px; color: grey;">'+data[i].fullname+'</div>'+
										'<div class="row" style="padding-top:10px; text-align: left; font-size:1vmin+margin-bottom: 5px;">'+
										'<div class="col-10" style="text-align: left; ">'+
											'<i class="material-icons small-rating">star</i>'+
										'</div>'+
										'<div class="col-10" style="text-align: left; ">'+
											'<i class="material-icons small-rating">star</i>'+
										'</div>'+
										'<div class="col-10" style="text-align: left;">'+
											'<i class="material-icons small-rating">star</i>'+
										'</div>'+
										'<div class="col-10" style="text-align: left; ">'+
											'<i class="material-icons small-rating">star</i>'+
										'</div>'+
										'<div class="col-10" style="text-align: left; ">'+
											'<i class="material-icons small-unrating">star</i>'+
										'</div>'+
										'<div class="col-10" style="text-align: left; ">'+
										'</div>'+
									'</div>'+
								'</a>'+
							'</div>'+
						 '</div>'+
						 '<div class="icon-social">'+
							'<div class="link icon-only" style="color: green; padding-right: 15px; font-size: 4vmin;">RM'+data[i].salary+'.00</div>'+
						 '</div>'+
					 '</div>'+
				 '</div>'+
			 '</article>'+
			 '<br>'
		}
		
		$( ".job_list" ).html(list);
		$(".workList").html(desc);
	});
});

myApp.onPageInit('list-work-aizal', function (page) {
	var url = window.location.href; 
	
	$.get("api/getJobDetails.php?id="+page.url.split('=')[1], function( data ) {
		var list = '';
		data = JSON.parse(data);
		for (var i in data) {
			list +=
				'<div class="navbar article">'+
					'<div class="navbar-inner opacity-container-top">'+
						'<div class="left"><a href="#" class="link icon-only back"><i class="material-icons">arrow_back</i></a></div>'+
						'<div class="center"></div>'+
						'<div class="right">'+
							'<a href="#" class="link icon-only" onclick="book('+data[i].id+')">'+
								'<i class="material-icons book">book</i>'+
							'</a>'+
						'</div>'+
					'</div>'+
				'</div>'+
				'<div class="header-container">'+
					'<div class="opacity-container" style="bottom:0px; z-index: 999">'+
						'<div class="profile-info">'+
							'<div class="row no-gutter" style="text-align: left;">'+
								'<div class="col-100 info" style="text-align: left;font-weight:;font-size: 5vmin;margin-bottom: -5px;">'+data[i].work+'</div>'+
							'</div>'+
							'<div class="row no-gutter">'+
								'<div class="col-100 stats" style="text-align: left;font-weight: lighter;font-size: 4vmin;">'+data[i].address+'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'<div data-pagination=".swiper-pagination" data-paginationhide="true" class="swiper-container swiper-init ks-demo-slider swiper-container-horizontal swiper-container-android" style="margin-top: -53px;">'+
					'<div class="swiper-wrapper" style="transform: translate3d(0px, 0px, 0px);transition-duration: 0ms;height: 288px;">'+
						'<div style="width: 412px;" class="swiper-slide swiper-slide-active">'+
							'<span class="swiper-zoom-container">'+
								'<img src="'+data[i].pic+'" width="100%">'+
							'</span>'+
						'</div>'+
						'<div style="width: 412px;" class="swiper-slide swiper-slide-next">'+
							'<span class="swiper-zoom-container">'+
								'<img src="'+data[i].pic2+'" width="100%">'+
							'</span>'+
						'</div>'+
						'<div style="width: 412px;" class="swiper-slide">'+
							'<span class="swiper-zoom-container">'+
								'<img src="'+data[i].pic3+'" width="100%">'+
							'</span>'+
						'</div>'+
						'<div style="width: 412px;" class="swiper-slide">'+
							'<span class="swiper-zoom-container">'+
								'<img src="'+data[i].pic3+'" width="100%">'+
							'</span>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>'+
				'<article>'+
				    '<div class="card ks-card-header-pic">'+
                        '<div class="card-footer">'+
				            '<div class="item-media">'+
				                '<a href="profile-worker.html?id='+data[i].user_email+'"><img src="'+data[i].user_pic+'" width="44" style="margin-top: 5px;"></a>'+
				            '</div>'+
				            '<div class="item-inner" style="margin-left: 20px;">'+
				                '<div class="row no-gutter" style="text-align: left;">'+
				                    '<a href="list_work.html">'+
				                        '<div class="col-100 info" style="text-align: left;font-weight:;font-size: 4vmin;margin-bottom: -10px; color: grey;">'+data[i].fullname+'</div>'+
				                        '<div class="row" style="padding-top:10px;text-align: left;font-size:1vmin;margin-bottom: 5px;">'+
				                            '<div class="col-100">'+
				                                '<div class="row">'+
				                                    '<div class="col-10" style="text-align: left;">'+
				                                        '<i class="material-icons small-rating">star</i>'+
				                                    '</div>'+
                                                    '<div class="col-10" style="text-align: left;">'+
                                                        '<i class="material-icons small-rating">star</i>'+
                                                    '</div>'+
                                                    '<div class="col-10" style="text-align: left;">'+
                                                        '<i class="material-icons small-rating">star</i>'+
                                                    '</div>'+
                                                    '<div class="col-10" style="text-align: left;">'+
                                                        '<i class="material-icons small-rating">star</i>'+
                                                    '</div>'+
                                                    '<div class="col-10" style="text-align: left;">'+
                                                        '<i class="material-icons small-unrating">star</i>'+
                                                    '</div>'+
                                                    '<div class="col-10" style="text-align: left;"></div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</a>'+
                            '</div>'+
                        '</div>'+
                        '<div class="icon-social">'+
				            '<div class="link icon-only" style="color: green; padding-right: 15px; font-size: 4vmin;">RM'+data[i].salary+'.00</div>'+
				        '</div>'+
				    '</div>'+
				    '<div class="card-footer">'+
				        '<div class="col-100" style="font-size: 3vmin;">'+
				            '<div class="row">'+
				                '<div class="col-100" style="text-align: left; font-weight: lighter;">Category</div>'+
				                '<div class="col-100" style="text-align: left;font-weight: bold;">'+data[i].cat_desc+'</div>'+
				        '</div>'+
				        '<div class="row">'+
				            '<div class="col-100" style="text-align: left; font-weight: lighter;">Date Advertise</div>'+
				            '<div class="col-100" style="text-align: left;font-weight: bold;">'+data[i].date+'</div>'+
				        '</div>'+
				        '<div class="row">'+
				            '<div class="col-100" style="text-align: left; font-weight: lighter;">Description</div>'+
				            '<div class="col-100" style="text-align: left;font-weight: bold;">'+data[i].details+'</div>'+
				        '</div>'+
				    '</div>'+
				'</div>'+
            '</div>'+
            '<div class="content-block cnfrm">'+
				'<a href="#" class="button button-big" onclick="applyJob('+data[i].id+')">Apply</a>'+
            '</div>'+
        '</article>'
		}
		$( ".details" ).html(list);
	});
});

myApp.onPageInit('list-work-detail', function (page) {
	var url = window.location.href; 
	
	$.get("api/getJobDetails.php?id="+page.url.split('=')[1], function( data ) {
		var list = '';
		data = JSON.parse(data);
		for (var i in data) {
			list +=
				'<div class="navbar article">'+
					'<div class="navbar-inner opacity-container-top">'+
						'<div class="left"><a href="#" class="link icon-only back"><i class="material-icons">arrow_back</i></a></div>'+
						'<div class="center"></div>'+
						'<div class="right">'+
							'<a href="#" class="link icon-only" onclick="book('+data[i].id+')">'+
								'<i class="material-icons book">book</i>'+
							'</a>'+
						'</div>'+
					'</div>'+
				'</div>'+
				'<div class="header-container">'+
					'<div class="opacity-container" style="bottom:0px; z-index: 999">'+
						'<div class="profile-info">'+
							'<div class="row no-gutter" style="text-align: left;">'+
								'<div class="col-100 info" style="text-align: left;font-weight:;font-size: 5vmin;margin-bottom: -5px;">'+data[i].work+'</div>'+
							'</div>'+
							'<div class="row no-gutter">'+
								'<div class="col-100 stats" style="text-align: left;font-weight: lighter;font-size: 4vmin;">'+data[i].address+'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'<div data-pagination=".swiper-pagination" data-paginationhide="true" class="swiper-container swiper-init ks-demo-slider swiper-container-horizontal swiper-container-android" style="margin-top: -53px;">'+
					'<div class="swiper-wrapper" style="transform: translate3d(0px, 0px, 0px);transition-duration: 0ms;height: 288px;">'+
						'<div style="width: 412px;" class="swiper-slide swiper-slide-active">'+
							'<span class="swiper-zoom-container">'+
								'<img src="'+data[i].pic+'" width="100%">'+
							'</span>'+
						'</div>'+
						'<div style="width: 412px;" class="swiper-slide swiper-slide-next">'+
							'<span class="swiper-zoom-container">'+
								'<img src="'+data[i].pic2+'" width="100%">'+
							'</span>'+
						'</div>'+
						'<div style="width: 412px;" class="swiper-slide">'+
							'<span class="swiper-zoom-container">'+
								'<img src="'+data[i].pic3+'" width="100%">'+
							'</span>'+
						'</div>'+
						'<div style="width: 412px;" class="swiper-slide">'+
							'<span class="swiper-zoom-container">'+
								'<img src="'+data[i].pic3+'" width="100%">'+
							'</span>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>'+
				'<article>'+
				    '<div class="card ks-card-header-pic">'+
                        '<div class="card-footer">'+
				            '<div class="item-media">'+
				                '<a href="profile-worker.html?id='+data[i].user_email+'"><img src="'+data[i].user_pic+'" width="44" style="margin-top: 5px;"></a>'+
				            '</div>'+
				            '<div class="item-inner" style="margin-left: 20px;">'+
				                '<div class="row no-gutter" style="text-align: left;">'+
				                    '<a href="list_work.html">'+
				                        '<div class="col-100 info" style="text-align: left;font-weight:;font-size: 4vmin;margin-bottom: -10px; color: grey;">'+data[i].fullname+'</div>'+
				                        '<div class="row" style="padding-top:10px;text-align: left;font-size:1vmin;margin-bottom: 5px;">'+
				                            '<div class="col-100">'+
				                                '<div class="row">'+
				                                    '<div class="col-10" style="text-align: left;">'+
				                                        '<i class="material-icons small-rating">star</i>'+
				                                    '</div>'+
                                                    '<div class="col-10" style="text-align: left;">'+
                                                        '<i class="material-icons small-rating">star</i>'+
                                                    '</div>'+
                                                    '<div class="col-10" style="text-align: left;">'+
                                                        '<i class="material-icons small-rating">star</i>'+
                                                    '</div>'+
                                                    '<div class="col-10" style="text-align: left;">'+
                                                        '<i class="material-icons small-rating">star</i>'+
                                                    '</div>'+
                                                    '<div class="col-10" style="text-align: left;">'+
                                                        '<i class="material-icons small-unrating">star</i>'+
                                                    '</div>'+
                                                    '<div class="col-10" style="text-align: left;"></div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</a>'+
                            '</div>'+
                        '</div>'+
                        '<div class="icon-social">'+
				            '<div class="link icon-only" style="color: green; padding-right: 15px; font-size: 4vmin;">RM'+data[i].salary+'.00</div>'+
				        '</div>'+
				    '</div>'+
				    '<div class="card-footer">'+
				        '<div class="col-100" style="font-size: 3vmin;">'+
				            '<div class="row">'+
				                '<div class="col-100" style="text-align: left; font-weight: lighter;">Category</div>'+
				                '<div class="col-100" style="text-align: left;font-weight: bold;">'+data[i].cat_desc+'</div>'+
				        '</div>'+
				        '<div class="row">'+
				            '<div class="col-100" style="text-align: left; font-weight: lighter;">Date Advertise</div>'+
				            '<div class="col-100" style="text-align: left;font-weight: bold;">'+data[i].date+'</div>'+
				        '</div>'+
				        '<div class="row">'+
				            '<div class="col-100" style="text-align: left; font-weight: lighter;">Description</div>'+
				            '<div class="col-100" style="text-align: left;font-weight: bold;">'+data[i].details+'</div>'+
				        '</div>'+
				    '</div>'+
				'</div>'+
            '</div>'+
            '<div class="content-block cnfrm">'+
				'<a href="#" class="button button-big" >Applied</a>'+
            '</div>'+
        '</article>'
		}
		$( ".details" ).html(list);
	});
});

myApp.onPageInit('terms', function (page) {
	var url = window.location.href; 
	
	$.get("api/getNotification.php?id="+login_email, function( data ) {
		var list = '';
		data = JSON.parse(data);
		for (var i in data) {
			list +=
				'<li>'+
					'<a href="#" class="item-link item-content noti-tag">'+
						'<div class="item-media"><img src="img/gambar1.jpg" width="80"></div>'+
						'<div class="item-inner">'+
							'<div class="item-title-row">'+
								'<div class="item-title">work name</div>'+
								'<div class="item-after">12:02</div>'+
							'</div>'+
							'<div class="item-text">'+data[i].desc+'</div>'+
						'</div>'+
					'</a>'+
				'</li>'
		}
		$( ".notification" ).html(list);
	});
});

myApp.onPageInit('new-advert', function (page) {
	
	$.get("api/getJobCategory.php", function( data ) {
		var list = '';
		data = JSON.parse(data);
		for (var i in data) {
			list +=
				'<option value="'+data[i].cat_id+'">'+data[i].cat_desc+'</option>'
		}
		$( "#category_id" ).html(list);
	});
	var imgId = '';
	$(":file").change(function () {
	    if (this.files && this.files[0]) {
		  var reader = new FileReader();
		  reader.onload = imageIsLoaded;
		  reader.readAsDataURL(this.files[0]);
	    }
	    imgId = $(this).attr('id');
	});

	function imageIsLoaded(e) {
	    $('img#'+imgId).attr('src', e.target.result);
	    $('img#'+imgId).fadeIn();
	    $('.'+imgId+'.btn-img').addClass('btn-cancel fa-times').removeClass('fa-picture-o');
	};
	
	$("input .btn-cancel").click(function(){
		var imgId = $(this).attr('id');
		$('img#'+imgId).attr('src', '#');
		$('img#'+imgId).fadeOut();
		$('.'+imgId+'.btn-img').removeClass('btn-cancel fa-times').addClass('fa-picture-o');
		$('input#'+imgId).val('');
		alert( 'buang' );
		console.log($('input#'+imgId).val());
	});
});

myApp.onPageInit('profile-worker', function (page) {
	var url = window.location.href; 
	$.get("api/getProfileWorker.php?id="+page.url.split('=')[1]+'&login_email='+login_email, function( data ) {
		var list = '';
		var list2 = '';
		data = JSON.parse(data);
		for (var i in data) {
			followStatus = data[i].follow_status;
			if (followStatus == null) {
				followStatus = 'follow';
			}
			list2 += '<a href="#" class="link icon-only" style="line-height: 24px;"><span class="follow" id="'+data[i].user_email+'">'+followStatus+'</span></a>'
			list +=
				
				'<div class="header-container">'+
					'<img class="profile-header" src="img/jambatan.jpg">'+
					'<div class="item-media" style="position: absolute;top: calc(50% - 20vmin);left: calc(50% - 40vmin);">'+
						'<img src="'+data[i].user_pic+'" width="44" style="max-width: 20vmin;border: 3px solid white;">'+
						/* '<a style="position: absolute; top: 10vmin; left: calc(50% + 15vmin); width: 50vmin; text-shadow: 2px 2px 2px #151515;">'+data[i].fullname+'</a>'+ */
						'<a class="profile-name">'+data[i].fullname+'</a>'+
					'</div>'+
					'<div class="opacity-container" style="bottom:5px;">'+
						'<div class="profile-info">'+
							'<div class="row no-gutter" style="font-weight: 300;">'+
								'<div class="col-40 info">'+
									'<a href="list-following.html?id='+data[i].user_email+'" style="text-shadow: 0px 0px 12px rgb(0, 0, 0);" class="">Following  <span>'+data[i].following+'</span></a>'+
								'</div>'+
								'<div class="col-20 info">'+
									'<a href="#" style="text-shadow: 0px 0px 12px rgb(0, 0, 0);">|</a>'+
								'</div>'+
								'<div class="col-40 info">'+
									'<a href="list-follower.html?id='+data[i].user_email+'" style="text-shadow: 0px 0px 12px rgb(0, 0, 0);" class="">Follower  <span>'+data[i].follower+'</span></a>'+
								'</div>'+
						'</div>'+
                            '</div>'+
					'</div>'+
				'</div>'+
				'<article>'+
					'<div class="list-block" style="background: white;">'+
						'<ul>'+
							'<li>'+
								'<div class="item-content">'+
									'<div class="item-media fo-icon"><i class="fa fa-star-o fo-icon" aria-hidden="true"></i></div>'+
									'<div class="item-inner" style="border-bottom: 1px rgba(255, 255, 255, 0) solid;">'+
										'<div class="item-title adjust-font">Rating :  &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp '+
											'<a href="rating.html"> <span class="" style="color: #f66c26;">2 out of 5</span> <span style="color: grey;font-size: 13px;" class="">( 35 Ratings )</span> </a>'+
										'</div>'+
									'</div>'+
								'</div>'+
							'</li>'+
							'<li>'+
								'<div class="item-content">'+
									'<div class="item-media fo-icon"><i class="fa fa-user-o fo-icon" aria-hidden="true"></i></div>'+
									'<div class="item-inner" style="border-bottom: 1px rgba(255, 255, 255, 0) solid;">'+
										'<div class="item-title adjust-font">Joined : &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp<span style="color: #f66c26;">Two years ago</span></div>'+
									'</div>'+
								'</div>'+
							'</li>'+
							'<li>'+
								'<div class="item-content">'+
									'<div class="item-media fo-icon"><i class="fa  fa-id-badge fo-icon" aria-hidden="true"></i></div>'+
									'<div class="item-inner" style="border-bottom: 1px rgba(255, 255, 255, 0) solid;">'+
										'<div class="item-title adjust-font">Job Applied : &nbsp &nbsp <span style="color: #f66c26;">'+data[i].apply+'</span></div>'+
									'</div>'+
								'</div>'+
							'</li>'+
							'<li>'+
								'<div class="item-content">'+
									'<div class="item-media fo-icon"><i class="fa fa-address-card-o fo-icon" aria-hidden="true"></i></div>'+
									'<div class="item-inner" style="border-bottom: 1px rgba(255, 255, 255, 0) solid;">'+
										'<div class="item-title adjust-font">Job Offered : &nbsp &nbsp <span style="color: #f66c26;">'+data[i].offer+'</span></div>'+
									'</div>'+
								'</div>'+
							'</li>'+
						'</ul>'+
					'</div>'+
				'</article>'	
		}
		$( ".profileWorker" ).html(list);
		$( ".right" ).html(list2);
	});
});

myApp.onPageInit('list-follower', function (page) {
	var url = window.location.href; 
	$.get("api/getListFollower.php?id="+page.url.split('=')[1]+'&login_email='+login_email, function( data ) {
		var list = '';
		data = JSON.parse(data);
		for (var i in data) {
			list +=
				'<li class="accordion-item">'+
					'<div class="item-inner right-adjust">'+
						'<div class="item-media">'+
							'<img src="'+data[i].user_pic+'" width="44" style="margin-top: 5px;">'+
						'</div>'+
						'<div class="item-title-row" style="position: absolute; left: 62px;">'+
							'<div class="item-title">'+data[i].fullname+'</div>'+
							'<div class="item-after" style="margin-left: 0;">'+
								'<div class="row" style="padding-top: 5px;text-align: left;font-size:1vmin;margin-bottom: 5px;">'+
									'<div class="col-10" style="text-align: left;">'+
										'<i class="material-icons small-rating">star</i>'+
									'</div>'+
									'<div class="col-10" style="text-align: left;">'+
										'<i class="material-icons small-rating">star</i>'+
									'</div>'+
									'<div class="col-10" style="text-align: left;">'+
										'<i class="material-icons small-rating">star</i>'+
									'</div>'+
									'<div class="col-10" style="text-align: left;">'+
										'<i class="material-icons small-rating">star</i>'+
									'</div>'+
									'<div class="col-10" style="text-align: left;">'+
										'<i class="material-icons small-unrating">star</i>'+
									'</div>'+
									'<div class="col-10" style="text-align: left;"></div>'+
									'<div class="col-40" style="text-align: left;">'+
										'<div style="font-size: 3vmin;color: grey;line-height: 3vmin;font-weight: lighter;">(Ratings)</div>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div class="item-subtitle"><span class="button follow-list">follow</span></div>'+
					'</div>'+
				'</li>'
		}
		$("#listFollower").html(list);
	});
});

myApp.onPageInit('list-following', function (page) {
	var url = window.location.href; 
	$.get("api/getListFollowing.php?id="+page.url.split('=')[1]+'&login_email='+login_email, function( data ) {
		var list = '';
		data = JSON.parse(data);
		for (var i in data) {
			list +=
				'<li class="accordion-item">'+
					'<div class="item-inner right-adjust">'+
						'<div class="item-media">'+
							'<img src="'+data[i].user_pic+'" width="44" style="margin-top: 5px;">'+
						'</div>'+
						'<div class="item-title-row" style="position: absolute; left: 62px;">'+
							'<div class="item-title">'+data[i].fullname+'</div>'+
							'<div class="item-after" style="margin-left: 0;">'+
								'<div class="row" style="padding-top: 5px;text-align: left;font-size:1vmin;margin-bottom: 5px;">'+
									'<div class="col-10" style="text-align: left;">'+
										'<i class="material-icons small-rating">star</i>'+
									'</div>'+
									'<div class="col-10" style="text-align: left;">'+
										'<i class="material-icons small-rating">star</i>'+
									'</div>'+
									'<div class="col-10" style="text-align: left;">'+
										'<i class="material-icons small-rating">star</i>'+
									'</div>'+
									'<div class="col-10" style="text-align: left;">'+
										'<i class="material-icons small-rating">star</i>'+
									'</div>'+
									'<div class="col-10" style="text-align: left;">'+
										'<i class="material-icons small-unrating">star</i>'+
									'</div>'+
									'<div class="col-10" style="text-align: left;"></div>'+
									'<div class="col-40" style="text-align: left;">'+
										'<div style="font-size: 3vmin;color: grey;line-height: 3vmin;font-weight: lighter;">(Ratings)</div>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div class="item-subtitle"><span class="button follow-list">follow</span></div>'+
					'</div>'+
				'</li>'
		}
		$("#listFollowing").html(list);
	});
});

myApp.onPageInit('list-employee', function (page) {
	var url = window.location.href; 
	$.get("api/getListFollowing.php?id="+page.url.split('=')[1]+'&login_email='+login_email, function( data ) {
		var list = '';
		data = JSON.parse(data);
		for (var i in data) {
			list +=
				'<li class="accordion-item">'+
					'<div class="item-inner right-adjust">'+
						'<div class="item-media">'+
							'<img src="'+data[i].user_pic+'" width="44" style="margin-top: 5px;">'+
						'</div>'+
						'<div class="item-title-row" style="position: absolute; left: 62px;">'+
							'<div class="item-title">'+data[i].fullname+'</div>'+
							'<div class="item-after" style="margin-left: 0;">'+
								'<div class="row" style="padding-top: 5px;text-align: left;font-size:1vmin;margin-bottom: 5px;">'+
									'<div class="col-10" style="text-align: left;">'+
										'<i class="material-icons small-rating">star</i>'+
									'</div>'+
									'<div class="col-10" style="text-align: left;">'+
										'<i class="material-icons small-rating">star</i>'+
									'</div>'+
									'<div class="col-10" style="text-align: left;">'+
										'<i class="material-icons small-rating">star</i>'+
									'</div>'+
									'<div class="col-10" style="text-align: left;">'+
										'<i class="material-icons small-rating">star</i>'+
									'</div>'+
									'<div class="col-10" style="text-align: left;">'+
										'<i class="material-icons small-unrating">star</i>'+
									'</div>'+
									'<div class="col-10" style="text-align: left;"></div>'+
									'<div class="col-40" style="text-align: left;">'+
										'<div style="font-size: 3vmin;color: grey;line-height: 3vmin;font-weight: lighter;">(Ratings)</div>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div class="item-subtitle"><span class="button follow-list">follow</span></div>'+
					'</div>'+
				'</li>'
		}
		$("#listEmployee").html(list);
	});
});


function add_advert() {
	
	var job_desc = $('#job_desc').val();
	var job_salary = $('#job_salary').val();
	var job_date_work = $('#job_date_work').val();
	var job_address = $('#job_address').val();
	var category_id = $('#category_id option:selected').val();
	var job_details = $('#job_details').val();
	var user_email = login_email;
	var job_pic1 = $('#pic1').val();
	var job_pic2 = $('#pic2').val();
	var job_pic3 = $('#pic3').val();
	$.ajax({
		url : 'api/addAdvert.php',
		data : {
			job_desc : job_desc,
			job_salary : job_salary,
			job_date_work : job_date_work,
			job_address : job_address,
			category_id : category_id,
			job_details : job_details,
			user_email : user_email,
			job_pic1 : job_pic1,
			job_pic2 : job_pic2,
			job_pic3 : job_pic3
		},
		type : 'POST',
		success : function(res){
			alert(res);
			mainView.router.back();
		},
		error : function(err){
			alert(err.statusText);
		}
	});
}

function applyJob(id) {
	$.ajax({
		url : 'api/applyJob.php?id='+id+'&email='+login_email,
		success : function(res){
			alert(res);
			mainView.router.back();
		},
		error : function(err){
			alert(err.statusText);
		}
	});
}

function deleteJobApplied(id) {
	$.ajax({
		url : 'api/deleteJobApplied.php?id='+id+'&login_email='+login_email,
		success : function(res){
			mainView.router.refreshPage();
		},
		error : function(err){
			alert(err.statusText);
		}
	});
}

function deleteJobOffered(id) {
	$.ajax({
		url : 'api/deleteJobOffered.php?id='+id,
		success : function(res){
			mainView.router.refreshPage();
		},
		error : function(err){
			alert(err.statusText);
		}
	});
}

/* function onSuccess(googleUser) {
	 
	var profile = googleUser.getBasicProfile();
	 console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
	console.log('Name: ' + profile.getName());
	console.log('Image URL: ' + profile.getImageUrl());
	console.log('Email: ' + profile.getEmail());
	 
	var user_fullname = profile.getName();
	var user_pic = profile.getImageUrl();
	var user_email = profile.getEmail();
	login_email = profile.getEmail();
	$.ajax({
		url : 'api/login.php',
		data : {
			user_fullname : user_fullname,
			user_pic : user_pic,
			user_email : user_email
		},
		type : 'POST',
		success : function(res){
			mainView.router.loadPage('home.html');
		},
		error : function(err){
			alert(err.statusText);
		}
	});
}
    
function onFailure(error) {
	console.log(error);
}
    
function renderButton() {
	gapi.signin2.render('my-signin2', {
		  'scope': 'profile email',
		  'onsuccess': onSuccess,
		  'onfailure': onFailure
	});
} */

function book(id) {
	var id = id;
	$.ajax({
		url : 'api/bookJob.php?id='+id+'&login_email='+login_email,
		success : function(res){
		},
		error : function(err){
			alert(err.statusText);
		}
	});
}

$$(document).on('click', '.follow', function () {
    var test = $(this).text();

    if (test == "follow") {
        $(this).text('unfollow');
    } else {
        $(this).text('follow');
    }
    var employer_email = $('.follow').attr('id');
    
    $.ajax({
		url : 'api/follow.php',
		data : {
			user_email : login_email,
			employer_email : employer_email
		},
		type : 'POST',
		success : function(res){
		},
		error : function(err){
			alert(err.statusText);
		}
	});
});



//-----------------------------------------------------------------------------------------------------------------------berakhirnya sopia punye------------------------------------------------------------------
