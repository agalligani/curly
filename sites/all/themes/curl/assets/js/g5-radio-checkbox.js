/* 

    ============================================

    G5Framework

    =============================================

    g5-radio-checkbox.js

    --------

    Usage Example:

        <div class="group">
            <label for="gender-male">Male</label>
            <input id="gender-male" type="radio" name="gender" class="hidden" value="Male" />
        </div><!--end .group-->

    ==============================================

*/

var g5RadioCheckbox = function(){

    //Area for Context
    var baseContext = ( $('#wrapper').length <= 0 ) ? $('body') : $('#wrapper'),
        baseForm = baseContext.find('.group'),
        checkBoxes = baseForm.find('input[type="checkbox"], input[type="radio"]');

    (function(){

        if ( checkBoxes.length > 0 ) {

            var labels = checkBoxes.siblings('label');

            //Loop through Radio & Checkbox
            checkBoxes.each(function(){

                var _this = this,
                    _parent = $(_this).parent();

                if ( !_parent.is('.group') ) {

                    throw 'checkbox group element missing';

                }
                if ( $(_this).is(':checked') ) {

                    var _active = ' active';

                }
                else {

                    var _active = '';

                }

                if ( !(baseForm.find('i').length === checkBoxes.length) ) {

                    //Change Checkbox
                    if ( $(_this).is('input[type="checkbox"]') ) {
                        $(_this).addClass('hidden')
                                .clone().appendTo(_parent)
                                .replaceWith('<i class="checkbox' + _active + '"></i>');
                    };

                    //Change Radio
                    if ( $(_this).is('input[type="radio"]') ) {
                        $(_this).addClass('hidden')
                                .clone().appendTo(_parent)
                                .replaceWith('<i class="radio' + _active + '"></i>');
                    };

                };

            });//

            //Remove error from siblings if one checkbox/radio selected
            baseForm.find('i').on('click', function(){

                var _this = this,
                    _siblings = $(_this).parent().siblings().children(),
                    _input = $(_this).siblings('input'),
                    _inputName = _input.attr('name');

                //Toggle Active
                $(_this).toggleClass('active').siblings().toggleClass('active');

                //Remove errors on click
                if ( $(_this).siblings().is('.error') || _input.is('error') ) {
                    $(_this).removeClass('error').siblings().removeClass('error');
                    $('input[name="' + _inputName + '"]').removeClass('error').siblings().removeClass('error');
                };

                //If not active, not checked
                if ( !$(_this).hasClass('active') || !_input.hasClass('active') ) {
                    _input.removeAttr('checked');
                }

                //Add Native Checked Attribute
                else {
                    _input.attr('checked','checked');              
                };

                //Allow only one radio selection
                if ( $(_this).is('.radio') || $(_this).siblings('i').is('.radio') ) {
                    $(this).parent().siblings().children('i').removeClass('active');
                };

                //Refresh PIE CSS3 Rendering
                if ( window.PIE ) {
                    $(_this).parent().fireEvent('onmove');
                };

            });

            labels.on('click', function(event){
                
                $(this).siblings('i').trigger('click');

                event.preventDefault();

            });

        }

    }());

};