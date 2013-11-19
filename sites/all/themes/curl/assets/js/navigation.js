var megaMenu = function(){

    // console.log('G5: Navigation Executed');

};

megaMenu.prototype.elObj = {
    $header: $('#top'),
    $topLevel: $('.top-level'),
    $navigation: $('#top .primary'),
    $megaMenu: $('.mega-menu'),
    $megaMenuSection: $('.mega-menu').find('.nav-section'),
    $mainItem: $('#top .primary').find('.headlink'),
    $content: $('.content')
};

megaMenu.prototype.init = function(initObj){

    var _elements = initObj || this.elObj,
        _section,
        _killMenu,
        _showMenu;

    _elements.$mainItem.on('mouseenter', function(event){

        if ( $(this).is('.active') ) {

            megaMenu.prototype._killMenu();

        } else {

            _section = $(this).data().href,
            _sectionEl = $('#' + _section + '');

            $(this).addClass('active')
                .parent()
                    .siblings()
                        .children('.headlink')
                        .removeClass('active');

            megaMenu.prototype._showMenu(_sectionEl);

        }

        event.preventDefault();

    });

    _elements.$header.on('mouseleave', function(){
        megaMenu.prototype._killMenu();
    });

    // Add Active Class
    _elements.$mainItem.each(function(){
        var $anchor = $(this),
            $anchorHref = $anchor.attr('href').replace('/', ''),
            $anchorMatch = $anchorHref.split('-');
        
        for (var i = $anchorMatch.length - 1; i >= 0; i--) {
            if ($('body').attr('class').match($anchorMatch[i])) {
                $anchor.parent().addClass('active');
            }
        };
        
    });

    // _elements.$content.on('mouseenter', function(){
    //     megaMenu.prototype._killMenu();
    // });

};

megaMenu.prototype._killMenu = function(){

    this.elObj.$navigation.find('.headlink.active').removeClass('active');
    this.elObj.$megaMenuSection.hide();
    this.elObj.$megaMenu.hide();

};

megaMenu.prototype._showMenu = function(el){

    if ( !this.elObj.$megaMenu.is(':visible') ) {

        this.elObj.$megaMenu.stop(true, true).fadeIn(250);

    } else {

        this.elObj.$megaMenuSection.hide();
        
    }

    this.elObj.$megaMenu.find(el).show();
    this._subLevelMenu($(el));

};

megaMenu.prototype._subLevelMenu = function(el){

    var $section = el,
        $start = $section.find('.menu-start'),
        $levels = $section.find('.col').not('.menu-start'),
        $mainHeadlink = $section.find('.headlink');

    $levels.children().hide();
    $start.find('.headlink-parent').removeClass('active');

    $mainHeadlink.on('hover', function(event){

        var $this = $(this),
            $thisParent = $this.parent(),
            $thisLevel = $thisParent.closest('.col');

        $thisParent.siblings().children().removeClass('active');

        if ( $this.is('.headlink-parent') ) {

            var $this = $(this),
                $data = $this.data(),
                $subMenu = $data.subMenu;
            var $subSection = $section.find('.' + $subMenu + '');

            $subSection.siblings('ul').hide();
            $subSection.show();

            $subSection.mouseenter(function(){
                $this.addClass('active');
            });

            $subSection.mouseleave(function(){
                if ( $(this).parent().closest('.col').index() !== 1 ) {
                    $this.removeClass('active');
                }
            });

        } else {

            $levels.not($thisLevel).children().hide();

        }

    });

};