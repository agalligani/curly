/*

    ============================================

    G5Framework

    =============================================

	validation.js

    ==============================================

*/

var formValidation;

(function($){

formValidation = function(){

    $('.form-validation').each(function() {

        var _this = this,
        	_errorLabel = $(_this).find('.form-errors');

    	//Email Regex
    	$.validator.addMethod('emailRegex', function(value, element) {
    		return this.optional(element) || /^(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6}$/i.test(value); },
    		'Email must contain only letters, numbers, and acceptable symbols.'
    	);

    	//Text Regex
    	$.validator.addMethod('textRegex', function(value, element) {
    		return this.optional(element) || /^([a-zA-Z '-]+)$/i.test(value); },
    		'No special characters allowed.'
    	);

        //Not Equals Value
        $.validator.addMethod('valueNotEquals', function(value, element, arg){
            return arg != value; },
            'Value must not equal arg.'
        );

    	//Validate
        $(_this).validate({

            errorLabelContainer: _errorLabel,
            messages: {
                'name': {
                	required: 'Please enter a valid name'
                },
                'email': {
                	required: 'Please enter a valid email address'
                }
            },
            rules: {
            	'name': {
                    minlength: 2,
                    maxlength: 22,
                    textRegex: true
            	},
            	'email': {
            		email: true,
            		maxlength: 30,
            		emailRegex: true
            	},
            	'primary-search-input': {
            		minlength: 2,
                    maxlength: 22,
                    textRegex: true
            	}
            },
            invalidHandler: function(form) {

            	//Error
                // console.log('form validation: error');

            },
            submitHandler: function(form) {
				// console.log("form submitted");
				// console.log(_this);
				if ($(_this).hasClass('seasonal')) {
					sendFeedback();
					return false;
				}

				// console.log("Submission");
				if ($(_this).hasClass('top-ten')) {
					// console.log("top ten");
				}




                var postData = $(_this).serialize();

                //Success
                // console.log('form validation: success');
                // console.log(postData);

                //$(_this).hide();
                //$(_this).next('.thank-you').fadeIn('slow');

    			/*
    				$.ajax({
    				  type: 'POST',
    				  url: '/somewhere',
    				  data: postData,
    				  success: function() {

    				  	// console.log('ajax success');

    				  	return false;
    				  }
    				});
    			*/

    			return false;

        	}

        });

    });//

    if ( $('.form-validation').find('.action-link').length > 0 ) {
        $('.form-validation').find('.button.action-link').on('click', function(event){
            $(this).parent('form').submit();
            event.preventDefault();
        });
    }

    //Check Validation & Match Errors
    $('.form-validation').submit(function(){

    	var phoneField = $('.phone-format'),
    		checkBoxes = $(this).find('input[type="checkbox"], input[type="radio"]');

        //Remove dashes in phone field after submit
    	if ( phoneField.length > 0 ) {

    		phoneField.each(function() {

    			$(this).val( $(this).val().replace(/[^\d.]/g, '') );

    		});

    	};

    	//Add Errors
        if ( checkBoxes.hasClass('error') ) {

            var _invalid = checkBoxes.filter('.error');

            _invalid.each(function(){

                var _this = this,
                	_invalidName = $(_this).attr('name');

                $('input[name="' + _invalidName + '"]').addClass('error').siblings('i').addClass('error');

            });

        };

    });

};

}(jQuery));