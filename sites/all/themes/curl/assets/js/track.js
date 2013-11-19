/* 

    ============================================

    G5Framework

    =============================================

    track.js

    --------

    Version: 1.2
    
    Attributes:
        
        data-ga-value               // added by user for (non-form) elements to be tracked
        data-ga-more-values         // internal: joins multiple tracked item values
        data-ga-state               // added programatically by user as a conditional value to allow an element to be tracked; generally used for toggles
        data-ga-form-value          // internal: tracks from submit; needs data-ga-value on submit button
        data-ga-form-field-value    // added to form fields to be tracked
        
    Note:
    
        DO NOT USE return false; ON EVENT CALLBACKS!! IT WILL STOP SUBSEQUENT HANDLERS FROM FIRING! USE event.preventDefault(); INSTEAD!
        
    Usage Examples:

        Form Elements:
        
            <input type="text" name="city" id="city" value="City" data-ga-value="blur|try_nuvigil_free|city" />
            
            <input type="submit" value="Submit" data-ga-value="Click|Submit|Email Submit" />
            
        Anchor:
        
            <a class="button" href="#" data-ga-value="click|button|xiaflex xperience"></a>
            
            <a class="pdf" data-ga-value="PDF|Download|Understanding Lungs" href="#"></a>

        Checkbox:
        
            $('.checkbox').click(function(e){

                var $this = $(this);

                if ($this.is('.active')) {
                    $this
                        .removeClass('active')
                        .css('border-color', '#000')
                        .attr('data-ga-value', 'click|try_nuvigil_free|opt_out');
                }
                else {
                    $this
                        .addClass('active')
                        .css('border-color', '#f00')
                        .attr('data-ga-value', 'click|try_nuvigil_free|opt_in');
                };
        
            });
            
        Checkbox Toggle (track element only in the active state):

            $('.checkbox').click(function(e){

                var $this = $(this);

                if ($this.is('.active')) {
                    $this
                        .removeClass('active')
                        .css('border-color', '#000')
                        .attr('data-ga-state', 'active');
                }
                else {
                    $this
                        .addClass('active')
                        .css('border-color', '#f00')
                        .attr('data-ga-state', 'inactive');
                };
        
            });

    ==============================================
    

*/

//Setup
var _gaq = _gaq || [];

//Account
(function(){

    var _account,
        _domain;

    if ( window.location.href.indexOf('stage') >= 0 ) {

        //Stage
        var _account = 'UA-XXXXXXXX-1',
            _domain = 'stage.ddfcb.com';

    } else {

        //Production
        var _account = 'UA-96301-1',
            _domain = 'gsb.columbia.edu';

    };

    _gaq.push(['_setAccount', _account]);
    _gaq.push(['_setDomainName', _domain]);

})();

//Pageview
_gaq.push(['_trackPageview']);

//Script
(function(){
    var ga = document.createElement('script'); ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

//Delegate
$(function(){
    //set up form tracking
    $('[data-ga-value]').each(function(i,o){
        var $this = $(this);
        if ($this.attr('type') && $this.attr('type').match(/submit|image/i) || $this.attr('class') && $this.attr('class').match(/submit/i)) {
            if (typeof $this.closest('form').attr('data-ga-form-value') === 'undefined') {
                $this.closest('form').attr('data-ga-form-value', $this.attr('data-ga-value'));
                $('body').off('click.ga', 'form');
            }
        }
    });
    
    $('body').on({
        'click.ga': function(e){
            var $this = $(this);
            //form submit
            if ($this.attr('type') && $this.attr('type').match(/submit|image/i) || $this.attr('class') && $this.attr('class').match(/submit/i)) {
                e.preventDefault();
                $this.closest('form').blur();
                return;
            }
            //form inputs
            if (e.target.tagName.match(/input|select|textarea/i)) {
                //let blur handle this
                return;
            }
            
            //toggles
            if ($this.attr('data-ga-state')) {
                if ($this.attr('data-ga-state').match(/\bactive\b|validate/i)) {
                    gaEventTrack(e);
                }
                return;
            }

            gaEventTrack(e);
        },
        'blur.ga': function(e){
            if (e.target.tagName.match(/input|textarea/i)) {
                gaEventTrack(e);
            }
        },
        'mouseenter.ga': function(e){
            var $this = $(this);
            if ($this.attr('data-ga-value').match(/rollover/i)) {
                gaEventTrack(e);
            }
        },
        'mouseleave.ga': function(e){
        }
    },'[data-ga-value]');
    
    $('body').on('submit.ga', '[data-ga-form-value]', function(e){
        e.preventDefault();

        var $self = $(this),
            formValues = [],
            value;
        if ($self.find('[data-ga-form-field-value]')) {
            $self.find('[data-ga-form-field-value]').each(function(i,o){
                var $this = $(this);
                if ($this.is('.option') || $this.is(':radio') || $this.is(':checkbox')) {
                    if ($this.is('.on') || $this.is(':checked')) {
                        formValues.push($this.attr('data-ga-form-field-value').split('|')[2]);
                    }
                } else if ($this.is('select')) {
                    value = $this.attr('data-ga-form-field-value').split('|')[2];
                    if (value.match(/value/i)) {
                        formValues.push($this.val());
                    }
                } else if ($this.is('input')) {
                    value = $this.attr('data-ga-form-field-value').split('|')[2];
                    if (value.match(/value/i)) {
                        formValues.push($this.val());
                    }
                } else {
                    value = $this.attr('data-ga-form-field-value').split('|')[2];
                    if (value.match(/value/i)) {
                        formValues.push($this.text());
                    }
                }
            });

            $self.attr('data-ga-more-values', formValues.join('|'));
            //gaEventTrack(e);
        }// else {
        gaEventTrack(e);
        //}
    });
});

var gaEventTrack = (function(e){
    var $this = $(e.target),
        target = e.target.tagName.toLowerCase(),
        ga_attr = (target === 'form') ? 'data-ga-form-value' : 'data-ga-value',
        ga_components = (function parse($$this, count){
            var inner, count = count || 0;
            //check targets for data attributes
            if (typeof $$this.attr(ga_attr) === 'undefined') {
                if (count > 1) { return ; }
                inner = parse($(e.currentTarget), ++count);
            } else {
                return $$this.attr(ga_attr).split('|');
            }
            return inner;

        })($this),
        $track_event = (!ga_components) ? '' : ga_components[0],
        $track_title = (!ga_components) ? '' : ga_components[1],
        $track_value = (!ga_components) ? '' : ga_components[2]

    if ($this.attr('data-ga-more-values')) {
        $track_value += '|' + $this.attr('data-ga-more-values');
    }
    
    google_track('_trackEvent', $track_title, $track_event, $track_value);
});

//Track Function
function google_track(trackEvent, trackTitle, trackType, trackValue){
    _gaq.push([trackEvent, trackType, trackTitle, trackValue]);

    // console.log(trackEvent + ' ' + trackTitle + ' ' +  trackType + ' ' + trackValue);
};