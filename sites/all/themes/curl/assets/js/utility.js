/* 

    ============================================

    G5Framework

    =============================================

	utility.js

    ==============================================

*/

var G5App = function(){
	this.location = window.location,
	this.path = location.pathname.substring(0, location.pathname.lastIndexOf('/') + 1),
	this.isTouch = ('ontouchstart' in document.documentElement),
	this.isiPhone = ( (navigator.userAgent.indexOf('iPhone') !== -1) || (navigator.userAgent.indexOf('iPod') !== -1) ),
	this.isiPad = navigator.userAgent.match(/iPad/i) !== null;
}

G5App.prototype.cache = {
	window: $(window),
	document: $(document),
	html: $('html'),
	body: $('body')
}

G5App.prototype.events = function(elObj){

	var $elCache = elObj,
		$window = $elCache.window,
		$document = $elCache.document,
		$html = $elCache.html,
		$body = $elCache.body;

    if ( this.isTouch !== undefined && this.isTouch !== false ) {
        
        $html.removeClass('no-touch').addClass('touch');
    
    } else {

		$document.find('.return-top').click(function(){
			$('html, body').animate({
				scrollTop: $($(this).attr('href')).offset().top + 'px'
			}, {
				duration: 250,
				easing: 'swing'
			});
			return false;
		});

		$window.bind('dblclick', function(event){
		    if ( window.getSelection ) {
		        window.getSelection().removeAllRanges();
		    }
		    else if ( document.selection ) {
		        document.selection.empty();
		    }
		});

    }

	$document.find('.print').on('click', function(){
		window.print();
		return false;
	});

}

G5App.prototype.init = function(){

	// console.log('G5: ' + this.cache.html.attr('class'));
	// console.log('G5: ' + this.location);
	// console.log('G5: ' + this.path);

    $.fn.extend({
        _animate: $.fn.animate,
        animate: function(prop, speed, callback, easing) {
            return this.is(':animated') || this._animate(prop, speed, callback, easing);
        }
    });

	this.events(this.cache);

}

function isSafari() {
	return $.browser.webkit && !window.chrome;
}

