(function($){

var bars = '.jspHorizontalBar, .jspVerticalBar';

$('.scroll-pane').each(function(){

    if ( CBS.isiPhone || CBS.isTouch && CBS.cache.window.width() <= 480 ) {

        $(this).css('height', '100%');

    } else {

        $(this).jScrollPane({
            autoReinitialise: false,
            showArrows: false
        });

        var api = $(this).data('jsp'),
            throttleTimeout;

        $(this).find(bars).hide();

        $(this).on('mouseenter', function(){

            $(this).find(bars).stop().fadeIn('fast');

        }).on('mouseleave', function(){

            $(this).find(bars).stop().fadeOut('fast');

        });

        $(window).bind('resize', function(){
            if ( $.browser.msie ) {

                if ( !throttleTimeout ) {

                    throttleTimeout = setTimeout(function(){
                        api.reinitialise();
                        throttleTimeout = null;
                        }, 50);

                }

            } else {

                api.reinitialise();

                $('.scroll-pane').find(bars).hide();
            }

        });

        $(this).bind('mousewheel', function(e, d){

            if ( d > 0 && $(this).scrollTop() == 0 ) {

                e.preventDefault();

            } else {

                if ( d < 0 && $(this).scrollTop() == $(this).get(0).scrollHeight - $(this).innerHeight() ) {
                    e.preventDefault();
                }

            }

        });

    }

});

}(jQuery));