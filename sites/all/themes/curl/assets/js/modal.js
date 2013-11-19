/* 

    ============================================

    G5Framework

    =============================================

	modal.js

    --------

    Usage Examples:

		<a href="#" rel="modal" data-modal_type="standard" data-modal_content="example">Load Example Modal</a>

			modal_type = style to associate with modal
			modal_content = ID of element to be loaded

		<a href="http://google.com" rel="external">Exit Ramp</a>

	Required Elements:

		<div class="overlay">
		    <div class="overlay-bg">&nbsp;</div>
		    <article class="overlay-content">&nbsp;</article>
		</div><!--end .overlay-->

    ==============================================

*/

var g5Modal = function(){

	var _wrap = ( $('#wrapper').length <= 0 ) ? $('body') : $('#wrapper');

	(function(){

		var $overlay = _wrap.find('.overlay'),
			$overlayBg = _wrap.find('.overlay-bg'),
			$overlayContent = _wrap.find('.overlay-content');
			
		if ( $overlay.length <= 0 ) {

			throw 'overlay element not found, cant proceed';

		}
		else if ( $overlayBg.length <= 0 ) {

			throw 'overlay background element not found';

		}
		else if ( $overlayContent.length <= 0 ) {

			throw 'overlay content element not found';

		}

	}());

	//Launch Modal
	var openModal = function(){

		//This = rel="modal" or rel="external"
		var _this = this,
			_modalData = $(_this).data(),
			_modalType = _modalData.modal_type,
			_modalContent = _modalData.modal_content;

		//External Link
		if ( $(_this).attr('rel') === 'external' ) { 

			var _modalType = 'secondary',
				_modalContent = 'exit-ramp',
				_externalLink = $(_this).attr('href');

		}

		//Locate Content
		var _modalWrap = _wrap.find('#' + _modalContent + ''),
			_modalMarkUp = _modalWrap.html();

		//Define Overlay Base
		var _overlay = _wrap.find('.overlay'),
			_overlayContent = _wrap.find('.overlay-content');
		
		//Inject Markup
		_overlayContent.html(_modalMarkUp);

		//Add Style
		(function() {

			var _modalBase = _overlayContent.children('.modal');

			if ( _modalType === 'standard' ) {

				_modalBase.addClass('standard');

			}
			if ( _modalContent === 'exit-ramp' ) {

				var _continueLink = _modalBase.find('.exit-continue');

				_continueLink.attr({
					href: _externalLink,
					target: '_blank'
				});

			} else {

				_modalBase.addClass(_modalType);

			}

		})();

		_overlay.fadeIn(260);

		var _modal = $('.modal');
			_modal.css('margin-top', '-' + (_modal.height() / 2) + 'px');

		return false;	

	};

	//Close Modal
	var closeModal = function() {

		$('.overlay').fadeOut('fast');

		return false;

	};

	//Selectors
	$('a[rel="modal"], a[rel="external"]').on('click', openModal);
	$('.modal-close, .exit-cancel, .overlay-bg').live('click', closeModal);

	//Keyboard
    $(document).keyup(function(e) {

    	if ( $('.modal:visible').length > 0 ) {

	        if ( e.keyCode === 27 ) { 

	        	closeModal(); 
	        	
	        } 

    	}

    });

};