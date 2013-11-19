$(document).ready(function() {	
	function isSafari() {
		return $.browser.webkit && !window.chrome;
	}
	
	// Array to keep track of all players so that 
	// they can be controlled/stopped on marquee switch etc
	var players = [];

	$('.video-js').each(function() {
		
		// Hack: had video control issues on video.js with Safari so 
		// I defaulted to native HTML5 controls instead.
		if (isSafari()) {
			players.push(this);
		} else {
			// Otherwise keep track of video.js player
			_V_(this).ready(function(){
				players.push(this);
	        });
		}        
	});
	
	$('.hero-control .headlink').click(function() {				
		$(players).each(function() {
			this.pause();
		});
	});
});