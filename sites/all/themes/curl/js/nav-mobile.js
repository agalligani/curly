(function ($) {

  function initNav(){
      var $nav = $('#nav'),
          $navUl = $nav.find('ul'),
          $navLi = $nav.find('li'),
          $navSpan = $navLi.find('span');
  
      (function(){
  
          $navUl.hide();
          $navSpan.each(function() {
              var $nextAnchor = $(this).next('a'),
                  $nextAnchorHref = $nextAnchor.attr('href').replace('/', ''),
                  $nextAnchorMatch = $nextAnchorHref.split('-');
              
              $nextAnchor.addClass('primary-item');
  
              for (var i = $nextAnchorMatch.length - 1; i >= 0; i--) {
                  if ($('body').attr('class').match($nextAnchorMatch[i])) {
                      $nextAnchor.addClass('active');
                  }
              };
              
          });
  
      }());
      
      $navSpan.click(function(event){
  
          var nextEl = $(this).next().next();
  
          $navSpan.each(function() {
              $(this).removeClass('expanded');
          });
          
          if ((nextEl.is('ul')) && (nextEl.is(':visible'))) {
              $('#nav ul:visible').slideUp('fast');
              $('#nav li span').each(function() {
                  $(this).removeClass('expanded');
              });
                  
              return false;
          }
          if ((nextEl.is('ul')) && (!nextEl.is(':visible'))) {
              $('#nav ul:visible').slideUp('fast');
              nextEl.slideDown('fast');
              return false;
          }
          
          $(this).addClass('expanded');
          return false;
  
      });
  };
  
  $(document).ready(function() {
      initNav();
  });

})(jQuery);