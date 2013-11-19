/* 

    +------------------+
    |sn3cf             |
    |p+=*              |
    |-j1               |
    |=+                |
    |f          #  ##  |
    |           # #    |
    |           #  ##  |
    |        #  #    # |
    |         ##   ##  |
    +------------------+
    jsstyle.github.com 

    =============================================

    Columbia Business School // G5Framework

    =============================================

    TODO : Concatenate & Minify JS Pre-production

    ---------------------------------------------

    00  jQuery
        
        01  Utility
        02  Simple Drop
        03  Simple Modal
        04  Video.js
        05  Track.js
        06  Message.js

    ==============================================

*/
var CBS;
	
if ( !window.console ) { 
    window.console = function(){
        this.log = function(str) {};
        this.dir = function(str) {};
    };
}

yepnope([
    {
        load: [
            '/sites/all/themes/gsb_theme/assets/js/libs/jquery-1.8.2.min.js'
        ],
        complete: function(){
            if ( !window.jQuery ) {

                yepnope([
                    {
                        load: [
                             '/sites/all/themes/gsb_theme/assets/js/libs/jquery-1.8.2.min.js'
                        ],
                        complete: function(){
                            // console.log('G5: CDN Failed - Loaded local version of jQuery.');
                        }
                    }
                ]);

            }

        }
    },
    {
        load: [
            '/sites/all/themes/gsb_theme/assets/js/utility.js',
            '/sites/all/themes/gsb_theme/assets/js/simple-drop.js',
            '/sites/all/themes/gsb_theme/assets/js/libs/jquery.simplemodal.js',
            '/sites/all/themes/gsb_theme/assets/js/track.js',
            '/sites/all/themes/gsb_theme/assets/js/message.js'
        ],
        complete: function(){

            'use strict';

            // console.log('G5: Primary JS Loaded');

            CBS = new G5App;
            CBS.init();



            if ( typeof CBS !== 'object' ) {
                throw 'G5: Missing utility object, cant proceed.';
            }

            $(function(){

                var mobileBreakPoint = 700;
                var videoPlayer = null;

                if ($(window).width() <= mobileBreakPoint){
                    $(".marquee .item-wrap").show();
                    $(".hero-wrap .message").attr("style","");
                    
                    /* Destroy ScrollPane */
                    var originHeight = $(".jspPane").height();
                    $('.jspPane, .jspContainer, .jspScrollable').removeAttr('style');
                    $(".jspPane").removeClass("jspPane");
                    $(".jspContainer").removeClass("jspContainer");
                    $(".jspScrollable").removeClass("jspScrollable");
                    $(".jspVerticalBar").hide();
                    $(".scroll-pane").css("min-height", originHeight + "px").css("width", "100%");
                    
                    /* Show Only Three Latest Curl Items */
                    $("#block-curl-curl .curl-item").hide();
                    $("#block-curl-curl .curl-item:lt(3)").show();
                    $("#block-curl-curl .scroll-pane").css("min-height", "435px");
                }
  
				
                // console.log('G5: DOM Ready');
                // console.log('G5: @Columbia_biz');

                (function(){ 

                    var $header = $('#top'),
                        $topLevelNav = $header.find('.top-level'),
                        $primaryNav = $header.find('.primary'),
                        $heroWrap = $('.hero-wrap'),
                        $mobileMarquee = $('#block-marquee-home-marquee-mobile'),
						$heroSection = $('#hero-section');
                    CBS.cache.window.resize(function(){
                        if ($(window).width() <= mobileBreakPoint) {
                            $topLevelNav.hide().addClass('none');
                            $primaryNav.hide().addClass('none');
                            $heroWrap.removeClass('none').show();
                            $(".marquee .item-wrap").show();
                            $(".marquee .message").attr("style", "");
                            
                        } else if ($(window).width() >= mobileBreakPoint) {
                            $topLevelNav.fadeIn('slow').removeClass('none');
                            $primaryNav.fadeIn('slow').removeClass('none');
                            $heroWrap.fadeIn('slow').removeClass('none');
                        }
                    });

				    if (!swfobject.hasFlashPlayerVersion("9.0.18") && !$('html').is('.video')) {
				    	$('.flash-warning').show();
				    } else { 

						if (!isSafari()) {
							 yepnope([
	                            {
	                                load: [
	                                    '/sites/all/themes/gsb_theme/components/video-js/video.js'
	                                ],
	                                complete: function(){
	                                	
										
									    
	                                    yepnope([
					                        {
					                            load: [
					                                '/sites/all/themes/gsb_theme/assets/js/video-load.js'
					                            ],
					                            complete: function(){
												
					
					                            }
					                        }
					                   	 ]);
	
	                                }
	                            }
	                       	 ]);
						} else {
						
							yepnope([
	                        {
	                            load: [
	                                '/sites/all/themes/gsb_theme/assets/js/video-load.js'
	                            ],
	                            complete: function(){
	
	                                // console.log('Video Helper Loaded');
	
	                            }
	                        }]);
	                     
						}
                    }
                    
                    if ( CBS.isiPhone || CBS.isiPad ) {
					
                        yepnope([
                            {
                                load: [
                                    '/sites/all/themes/gsb_theme/assets/js/ios-orientationchange-fix.js'
                                ],
                                complete: function(){

                                    // console.log('G5: Orientation Fix Loaded');

                                }
                            }
                        ]);

                    }
                    if ( $('#top').find('.mega-menu').length > 0 ) {

                        // var $header = $('#top'),
                        //     $topLevelNav = $header.find('.top-level'),
                        //     $primaryNav = $header.find('.primary');

                        (function(){

                            if ( CBS.cache.window.width() <= mobileBreakPoint ) {

                                yepnope([
                                    {
                                        load: [
                                            '/sites/all/themes/gsb_theme/assets/js/nav-mobile.js'
                                        ],
                                        complete: function(){

                                            // console.log('Mobile Navigation Loaded');

                                        }
                                    }
                                ]);   

                            } else {

                                yepnope([
                                    {
                                        load: [
                                            '/sites/all/themes/gsb_theme/assets/js/navigation.js'
                                        ],
                                        complete: function(){

                                            var columbiaMegaNav = new megaMenu();
                                                columbiaMegaNav.init();

                                            $topLevelNav.fadeIn('slow').removeClass('none');
                                            $primaryNav.fadeIn('slow').removeClass('none');

                                        }
                                    }
                                ]);   

                            }

                        })();  

                    }
                    if ( CBS.cache.window.width() >= mobileBreakPoint && $heroWrap.length > 0 ) { 

                        yepnope([
                            {
                                load: [
                                    '/sites/all/themes/gsb_theme/assets/js/hero.js'
                                ],
                                 complete: function(){
                                   var initial_hero = 0; 
                                   if(location.pathname == "/" || location.pathname == ""){
                                      initial_hero = 1;
                                   } 
                                    
                                    var columbiaHero = new mainHero();
                                        columbiaHero.init({
                                            el: $heroWrap,
                                            type: ( $('body').is('.front.landing-page') ) ? 'secondary' : 'primary',
                                            initial: initial_hero 
                                        });
                                }


                            }
                        ]);

                    }
                    if ( $('.scroll-pane').length > 0 && CBS.cache.window.width() >= mobileBreakPoint) { 

                        yepnope([
                            {
                                load: [
                                    '/sites/all/themes/gsb_theme/assets/js/libs/jquery.mousewheel.js',
                                    '/sites/all/themes/gsb_theme/assets/js/libs/jquery.jscrollpane.min.js',
                                    //'/sites/all/themes/gsb_theme/assets/js/jquery.jscrollpane-setup.js'
                                ],
                                complete: function(){


                                var thisWindowWidth = $(window).width();
                                if(thisWindowWidth<700) {
                                        $('.scroll-pane, .jspContainer, .jspPane').attr('style','width: 100% !important');
                                }

                                $(window).resize(function(){

                                    var thisWindowWidth = $(window).width();
                                    if(thisWindowWidth<700) {
                                        $('.scroll-pane, .jspContainer, .jspPane').attr('style','width: 100% !important');
                                    }

                                });

                                }
                            }
                        ]);

                    }
                    if ( $('.scroll-pane.horizontal-sliding-tabs').length > 0 && CBS.cache.window.width() >= mobileBreakPoint) { 

                        yepnope([
                            {
                                load: [
                                    //'/sites/all/themes/gsb_theme/assets/js/libs/jquery.mousewheel.js',
                                   // '/sites/all/themes/gsb_theme/assets/js/libs/jquery.jscrollpane.min.js',
                                    '/sites/all/themes/gsb_theme/assets/js/jquery.jscrollpane-setup.js'
                                ],
                                complete: function(){

                                    // console.log('G5: Scroll Pane Assets Loaded');

                                }
                            }
                        ]);

                    }
                    if ( $('.form-validation').length > 0 ) {

                        yepnope([
                            {
                                load: [
                                    '/sites/all/themes/gsb_theme/assets/js/libs/jquery.validate.min.js',
                                    '/sites/all/themes/gsb_theme/assets/js/libs/jquery.metadata.js',
                                    '/sites/all/themes/gsb_theme/assets/js/validation.js'
                                ],
                                complete: function(){

                                    formValidation();

                                }
                            }
                        ]);

                    }
                    if ( !CBS.isTouch && $('[placeholder]').length > 0 ) {

                        yepnope([
                            {
                                load: [
                                    '/sites/all/themes/gsb_theme/assets/js/libs/jquery.placeholder.min.js'
                                ],
                                complete: function(){

                                    $('[placeholder]').placeholder();

                                }
                            }
                        ]);

                    }
                    /*if ( $('.events-tabs').length > 0 || $('.tabs').length > 0) {

                        yepnope([
                            {
                                load: [
                                    '/sites/all/themes/gsb_theme/assets/js/tabs.js'
                                ],
                                complete: function(){

                                    var eventsTabs = new g5Tabs();
                                        eventsTabs.init({
                                            el: $('.events-tabs')
                                        });

                                }
                            }
                        ]);

                    }*/
                    if ( $('#top').find('.faculty').length > 0 ) {

                        var dropMenu = new simpleDrop();
                            dropMenu.init({
                                el: $('.faculty .headlink'),
                                oneOpen: true,
                                effect: 'slide',
                                event: 'mouseenter',
                                eventClass: 'navigational',
                                time: 150
                            });

                    }
                    if ( $('.user-select-wrap').length > 0 ) {
                        
                        
                        
                        var userSelectDrop = new simpleDrop();
                            userSelectDrop.init({
                              el: $('.user-select-wrap').find('.select-down'),
                              oneOpen: true,
                              effect: 'slide',
                              time: 150,
                              hideOnMouseLeave: true //for select a service only
                        });
                            
                        $("body").click(function() {
                          if (!$(".user-select-wrap .select-down").hasClass("active")) {
                            $(".user-select-wrap").find(".navigational-list-container").attr("style", "");
                            $(".user-select-wrap .select-down").removeClass("active");
                          }
                        });
                        
                        

                    }
                    if ( $('.faq-list').length > 0 ) {

                       $(".faq-headlink").click(function() {
                          $('.item').hide();
                          if($(this).hasClass("active")){
                            $(this).removeClass("active");
                            $(this).next('.item').hide();
                            $(".jspContainer, .top-ten-questions-asked .scroll-pane").height(540);
                          } else {
                            $(".faq-headlink").removeClass("active");
                            $(this).addClass("active");
                            $(this).next('.item').show();
                            var newHeight = 540 + $(this).next('.item').height() + 56;
                            $(".jspContainer, .top-ten-questions-asked .scroll-pane").height(newHeight);
                          }
                       });

                    }
                    if ( $('.hero-wrap-mobile').length > 0 ) {

                        var heroMobileAccordion = new simpleDrop();
                            heroMobileAccordion.init({
                                el: $('.hero-wrap-mobile').find('.expand-message'),
                                oneOpen: false,
                                effect: 'slide',
                                time: 150
                            });
                            
                        

                    }
                    if ( $('.seasonal-message').length > 0 ) {
                    
                        /*$('.seasonal-message').find('.copy').css('min-height', '' + $('.seasonal-message').find('.copy').eq(0).height() + 'px');*/
                    
                    }
                    if ( $('.module-control').length > 0 && CBS.cache.window.width() >= mobileBreakPoint) {

                        var moduleControl = {
                            expand: function(module){
                                var $module = $('.' + module + ':last'),
                                    $moduleHeight = $module.height() + 3,
                                    $moduleWidth = $module.width();
								//elange snippet
                                $module.parent().css({
                                    'width': $moduleWidth + 'px',
                                    'position': 'relative'
                                });
								//elange end snippet

                                $module.find('.module-control.expand').hide().end().addClass('expanded shdw-secondary');
                                $module.find('.expanded-copy').fadeIn('fast');
                                $module.find('.summary').hide();$module.find('.navigational-list').not('.user-list').fadeIn('fast');
                                
                                 if($module.css("top") != "-140px") $module.css("top","-140px");
								
								
								//elange uncenter module 
								$module.css({
									
									"position": "static",
									"top" : "0",
									"left" : "0"
								});
								
								//center module								
								var left_offset =  $module.position().left;
								var top_offset =  ((($(window).scrollTop() + (($(window).height() - $module.height())/2)) - ($module.offset().top) ) - 18);
								
								//then all that has to be done is to add the difference between the two
								$module.css({
									"position": "relative",
									"top" : "0 px",
									"left" : (left_offset)  +"px"
								});		
								
//								$("#block-curl-curl").css("margin-left", "28px");
								
								//elange end snippet
                            },
                            collapse: function(module){
                                var $module = $('.' + module + '');

                                $module.find('.navigational-list').hide();
                                $module.find('.expanded-copy').hide();
                                $module.find('.summary').show();
                                $module.find('.module-control.expand').fadeIn('fast').end().removeClass('expanded shdw-secondary');
                                
                               //uncenter module
								$module.css({
								"position": "static",
									"top" : "0",
									"left" : "0"
								});
								
								//elange end snippet 
                            }
                        }

                        $('.module-control').on('click', function(event){
                            var $this = $(this),
                                $module = $this.data().moduleParent;

                            if ( $this.is('.expand') ) {
                                moduleControl.expand($module);
                            } else {
                                moduleControl.collapse($module);
                            }

                            return false;
                        });

                        //collapses the expanded module if you click outside the expanded module
                        //
                        $('body').on('click', function(event){
                            //does nothing if the click event happened on the module
                            if($(event.target).parents().hasClass("expanded"))  return true;
							
							$(".module-control").each(function(){
								var $this = $(this),
									$module = $this.data().moduleParent;

								if (!$this.is('.expand') ) {
									moduleControl.collapse($module);
								}
							});
                            return true;
                        });
                    }
                    if ( $('.profiles-gallery').length > 0 ) {

                        var profileGallery = {
                            elCache: {
                                container: $('.profiles-gallery'),
                                item: $('.profiles-gallery').find('.profile'),
                                thumb: $('.profiles-gallery').find('.related').find('a')
                            },
                            events: function(){
                                this.elCache.thumb.on('click', function(event){
                                    var $this = $(this),
                                        $parent = $this.parent(),
                                        thumbData = $this.data(),
                                        profileId = thumbData.profileGalleryId;

                                    $parent.siblings().removeClass('active none');
                                    $parent.addClass('active');

                                    profileGallery.elCache.item.hide();
                                    profileGallery.elCache.container.find('.gallery-profile-' + profileId + '').fadeIn(250);

                                    event.preventDefault();
                                });
                            },
                            init: function(){
                                this.events();
                            }
                        }

                        profileGallery.init();

                    }
                    if ( window.location.href.match('login=show') ) {
                        $('#block-user-login').fadeIn('slow');
                    } 

                })();

            });

        }
    }
    
]);

/*
	Hack for making the site responsive by adjusting the viewport content.
		iPad and Desktop requires width to specified in pixel ie"1050px or 1024px"
		SmartPhone requires width to be set to "device-width" and " initial-scale=1"
	Should be re-factored by using real media queries.... 
		

*/
 
(function ($) {

	function detectmob() { 
	  if( navigator.userAgent.match(/Android/i)
	  || navigator.userAgent.match(/webOS/i)
	  || navigator.userAgent.match(/iPhone/i)
	  || navigator.userAgent.match(/iPod/i)
	  || navigator.userAgent.match(/BlackBerry/i)
	  || navigator.userAgent.match(/Windows Phone/i)
	  ){
		 return true;
	   }
	  else {
		 return false;
	   }
	 }

	if(detectmob()){
    $('meta[name=viewport]').remove();
    $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1">');

    $('iframe').css('width','100%');
    

	}
	
	
	
  var isiPad = navigator.userAgent.match(/iPad/i) != null;
  var ipadW = $(window).width();
  if (isiPad){
    if ($("body").hasClass("node-type-slidertemplate")) {
      
      var orientation = Math.abs(window.orientation) == 90 ? 'landscape' : 'portrait';
      
      if (orientation == "portrait"){
        $('meta[name=viewport]').remove();
        $('head').append('<meta name="viewport" content="width=1300px, initial-scale=0.6, minimum-scale=0.6, maximum-scale=1.0">');
      }
      else{
        $('meta[name=viewport]').remove();
        $('head').append('<meta name="viewport" content="width=1300px, initial-scale=0.74, minimum-scale=0.74, maximum-scale=1.0">');
      }
       
    }
    else{
    /* Render regular ipad viewport */
      if ($(window).width() == 1024){
        $('meta[name=viewport]').remove();
        $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1">');
      }
      if ($(window).width() == 768){
        $('meta[name=viewport]').remove();
        $('head').append('<meta name="viewport" content="width=1024px, user-scalable=1">');
      }
    
    }
  
  }
 
	
	
	
	  
	/* Mobile Tabs - Show Proper Content and Animate */
	$(".mobile.expand-template1 a").click(function() {
    var targetID = $(this).attr("id");
    targetID = targetID.substring(11, 12);
    
    /* Hide All Bottom Articles */
    $(".bottom-article").addClass("none");
    $("#tab-" + targetID + "-article").parent(".bottom-article").removeClass("none");
    
    /* Scroll To Proper Div */
    var targetOffset = $("#tab-" + targetID + "-article").offset().top;
    $('html,body').animate({ scrollTop: targetOffset });
  });
	
	$('.wrap-thumb-play-icon').click(function(){
		$(".wrap-thumb-kaltura img").hide();
		$(this).hide();
		$(".wrap-embed-kaltura").show();
	});
    
    
    setTimeout(function(){$('.jspVerticalBar').css('opacity','0.5');},1200);
    //add vertical scroll fade-in fade-out behavior
    	/*
		$('.scroll-pane').mouseover(function(){
//		    $(this).find('.jspVerticalBar').animate({opacity:'0.5'}, 300, function(){});
		    $(this).find('.jspVerticalBar').css('opacity','0.5');
		});
		
 		$('.scroll-pane').mouseout(function(){
// 		    $(this).find('.jspVerticalBar').animate({opacity:'0'}, 300, function(){});
		    $(this).find('.jspVerticalBar').css('opacity','0');
 		});
*/


})(jQuery);