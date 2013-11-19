/*
var simpleDrop = function(){
    this.defaults = {
        $el: $('.headlink'),
        effect: 'fade',
        event: 'click',
        eventClass: 'standard',
        time: 500,
        oneOpen: false
    }
    //// console.log('G5: simpleDrop Executed');
};

simpleDrop.prototype.init = function(initObj){

    var $el = initObj.el || this.defaults.$el,
        effect = initObj.effect || this.defaults.effect,
        $event = initObj.event || this.defaults.event,
        eventClass = initObj.eventClass || this.defaults.eventClass,
        time = initObj.time || this.defaults.time,
        oneOpen = initObj.oneOpen || this.defaults.oneOpen,
        subActive,
        subCheck;

    $el.on($event, function(event){
        
        var $this = $(this),
            $nextContent = $this.next(),
            $mainParent = $this.parent().parent();

        if ( $this.is('.active') ) {

            simpleDrop.prototype.close($el, effect);
            subActive = false;

        } else {
            
            if ( $event === 'mouseenter' && eventClass === 'navigational' ) {
                $mainParent.on('mouseleave', function(){
                    // console.log('mouse leave');
                    simpleDrop.prototype.close($el, effect);
                });

                $nextContent.on('mouseleave', function(){
                    simpleDrop.prototype.close($el, effect);
                });
            }
            if ( oneOpen ) {
                simpleDrop.prototype.close($el, effect);
            }
            if ( effect === 'slide' ) {
                $nextContent.slideToggle(time);
            }

            $this.toggleClass('active');

        }

        subActive = true;
        event.preventDefault();

    });

    subCheck = setInterval(function(){
        if (!!subActive) {
            simpleDrop.prototype.close($el, effect);
        }
    }, 1000);

    $('body').on('dblclick', function(){
        simpleDrop.prototype.close($el, effect);
    });

    $(document).keyup(function(e) {
        if ( e.keyCode === 27 ) { 
            simpleDrop.prototype.close($el, effect);
        } 
    });

};

simpleDrop.prototype.close = function(el, effect){
    if ( el.next().is(':visible') ) {
        el.removeClass('active');
        el.next().fadeOut('fast');
    }
};

*/

var simpleDrop = function(){
    this.defaults = {
        $el: $('.headlink'),
        effect: 'fade',
        event: 'click',
        time: 500,
        oneOpen: false
    }
    //// console.log('G5: simpleDrop Executed');
};

simpleDrop.prototype.init = function(initObj){

    var $el = initObj.el || this.defaults.$el,
        effect = initObj.effect || this.defaults.effect,
        $event = initObj.event || this.defaults.event,
        time = initObj.time || this.defaults.time,
        oneOpen = initObj.oneOpen || this.defaults.oneOpen;

	var mouseLeaveTimeout = null;

	if ($el.hasClass('auto-hide')) { 	
		$el.on('mouseleave', function() {
			mouseLeaveTimeout = setTimeout(function() {
				simpleDrop.prototype.close($el, effect);
			}, 100);
			
		});
	}
	
	

    $el.on($event, function(event){
		
        var $this = $(this),
            $nextContent = $this.next();

        if ( $this.is('.active') ) {

            simpleDrop.prototype.close($el, effect);

        } else {

            $this.toggleClass('active');

				$nextContent.on('mouseenter', function(){
                    clearTimeout(mouseLeaveTimeout);
                });


            if ( $event === 'mouseenter' ) {
            	clearTimeout(mouseLeaveTimeout);
            	
                $nextContent.on('mouseleave', function(){
                    simpleDrop.prototype.close($el, effect);
                });
            }
            if ( oneOpen ) {
                simpleDrop.prototype.close($el, effect);
            }
            if ( effect === 'slide' ) {
                $nextContent.slideToggle(time);
            }

        }

        event.preventDefault();

    });

    $('body').on('dblclick', function(){
        simpleDrop.prototype.close($el, effect);
    });

    $(document).keyup(function(e) {
        if ( e.keyCode === 27 ) { 
            simpleDrop.prototype.close($el, effect);
        } 
    });

};

simpleDrop.prototype.close = function(el, effect){

    if ( el.next().is(':visible') ) {

        el.removeClass('active');
        el.next().fadeOut('fast');

    }

};