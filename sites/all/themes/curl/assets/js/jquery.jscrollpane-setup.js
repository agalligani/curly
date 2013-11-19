var bars = '.jspHorizontalBar, .jspVerticalBar';

$('.scroll-pane').each(function () {

  var apiScroll;
  var tabposition;
  var destroyer = 1;
  var theScrollPane;
  var totalWidth = 0;
  
  $('.template1 .hero-control-slider li').removeClass('active');
  $('.template1 .hero-control-slider .hero-1').addClass('active');
  jQuery("ul.tab-1 li.slide").each(function () {
      totalWidth += jQuery(this).outerWidth();
  });
  $('ul.tab-1').css({
      'width': (totalWidth) + 'px'
  });
  theScrollPane = $('.scroll-pane').jScrollPane();
  var apiScroll = theScrollPane.data('jsp');

  var scrollBarW = 0;

  var jspDragWidth = $('.jspDrag').width() - 24;
  $('.jspDrag').css({'left': '0', 'width': jspDragWidth + 'px'}); 



  $('.template1 .hero-control li').unbind('click');

  /* $('.template1 .hero-control-slider li').click(function () { */
  $('.template1 .hero-control-slider ul > li').click(function () {

    if($(this).hasClass('active')){}
    else {
      
      $(this).siblings().removeClass('active');
      $(this).addClass('active');

      $('.bottom-article').addClass('none');
      $("#" + $(this).find('a').attr('id') + "-article").parent().removeClass('none').show();


      tabposition = $(this).find('.headlink').data('hero').slice(5);
      
      $('.tab-slides').hide();
      $('.tab-' + tabposition).show();

      totalWidth =  0;

      jQuery('.tab-' + tabposition + ' li.slide').each(function () {
      totalWidth += jQuery(this).outerWidth();
      });


    
      $('.jspPane').hide();
      $('.jspPane ul').css('display', 'none');
      $('.jspPane ul:nth-child(' + tabposition + ')').css('display', 'block');

      $( ".tab-slides" ).each(function() {
        var tabWidth = $(this).children().length;
        tabWidth = tabWidth * 640;
        $(this).css({'width': (tabWidth) + 'px'});
      });


      $('.jspPane').fadeIn('fast');

      theScrollPane = $('.scroll-pane').jScrollPane({
       contentWidth:(totalWidth-30)
       


      });

      apiScroll = theScrollPane.data('jsp');
      
      /* Move Slider to the left */
      //var jspDragWidth = $('.jspDrag').width() - 24;
      $('.jspPane').css('left', '0');  
      $('.jspDrag').css({'left': '0'}); 

      




      return false;


    }
  });




    


});