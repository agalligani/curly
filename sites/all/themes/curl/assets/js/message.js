var lastIndex = 1;

function sendFeedback() {
	$('.seasonal-message form').fadeOut('fast', function() {
		$('.message-' + lastIndex).find('h1').html('Thank You');
		$('.feedback').html('`Your feedback has been sent.');

	});			
	
	 var postData = $('.seasonal').serialize();
	 
	$.ajax({
		type: 'POST',
		url: '/sites/all/feedback.php',
		data: postData,
		success: function(response) {
			console.log('ajax success');
			console.log(response);
			return false;
		}
	});     
}

$(document).ready(function() {
	$('.module-control.expand').click(function() {
		$(this).hide();		
		var id = $(this).attr('data-id');
		$('.message-' + id + ' .expanded-copy').removeClass('none');
		return false;
	});

	$('.module-control.collapse').click(function() {
		var id = $(this).attr('data-id');
		$('.message-' + id + ' .expand').show();
		$('.message-' + id + ' .expanded-copy').addClass('none');
		return false;
	});

	$('.message-1').show();
	$('.seasonal-message').parent().css('min-height', '' + ($('.seasonal-message').height() + 3) + 'px');

	$('.seasonal-message .pagination li a').click(function() {
		var index = $(this).parent().attr('data-index');
		$('.message-' + lastIndex).fadeOut(100, function() {
			$('.message-' + index).fadeIn(100);
			$('.pagination .nav-' + lastIndex).removeClass('active');
			$('.pagination .nav-' + index).addClass('active');
			lastIndex = index;
		});
		return false;
	});
});
