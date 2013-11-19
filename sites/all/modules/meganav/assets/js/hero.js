
var mainHero = function(){
    // console.log('G5: Hero Executed');
}

mainHero.prototype.init = function(heroObj){
	this.events(heroObj);
};

mainHero.prototype.events = function(heroObj){

	var $heroWrap = heroObj.el,
		_type = heroObj.type || 'primary';

	var	$heroStart = heroObj.initial || 0,
		$headlink = $heroWrap.find('.headlink'),
		$headlinkWrap = $headlink.parent(),
		$messageWrap = $heroWrap.find('.message'),
		$message = $messageWrap.find('.item-wrap'),
		$notch = $messageWrap.find('.notch');

	var _heroId,
		_activePosition;

	$headlink.on('click', function(event){

		if ( $(this).parent().is('.active') || $(this).is('.active') ) {
		
			return false;
		
		} else {

			_heroId = $(this).data().hero;

			if ( _type === 'primary' ) {

				mainHero.prototype.adjustPosition($messageWrap, $(this).parent());

				var $heroBg = $heroWrap.find('.hero-bg'),
					$heroBgClass = $heroBg.attr('class');

				$heroBg.children().removeClass('active').stop(true, true).fadeOut(1500);
				$heroBg.find('.' + _heroId + '').addClass('active').stop(true, true).fadeIn(1500);

				_activePosition = setInterval(function(){
					mainHero.prototype.adjustPosition($messageWrap, $('.hero-control .active'));
				}, 550);

			} else {

				mainHero.prototype.adjustPosition($notch, $(this).parent());

				_activePosition = setInterval(function(){
					mainHero.prototype.adjustPosition($notch, $('.hero-control .active'));
				}, 550);

			}

			$(this).parent().addClass('active').siblings().removeClass('active');

			$messageWrap.children('.item-wrap').hide();
			$messageWrap.find('.' + _heroId + '').show();
			$messageWrap.fadeIn(1000);

		}
		
		event.preventDefault();

	});

	// (function(){
	// 	if ( _type === 'secondary' ) {
	// 		$headlink.each(function(){
	// 			if ( $(this).children().text().length > 22 ) {
	// 				$(this).children().addClass('two-line');
	// 			}
	// 		});
	// 	}
	// })();

	//Trigger Initial
	$headlink.eq($heroStart).trigger('click');

	//Check Position
	$heroWrap.mouseleave(function(){
		clearInterval(_activePosition);
	});

}

mainHero.prototype.adjustPosition = function(elOne, elTwo){
	if ( elOne.position().left !== elTwo.position().left ) {
		elOne.animate({
			'left': '' + elTwo.position().left  + 'px'
		}, 500);
	}
};
