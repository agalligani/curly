(function ($) {
window.nomenclature = null;
window.searchString = null;

Drupal.behaviors.landing = {
  attach:function (context) {

if ($('.region-content-inner .block-inner').length == 0) {
	$('.region-content-inner').append("<div class='block-inner'></div>");
}

var $container = $('.region-content-inner .block-inner');

function setReset() {
  $("#reset").removeClass("hidden");
  $("#reset").off().click(function(){
    $(this).addClass("hidden");
      $('.curl-search').val('');
  window.nomenclature = null;
  window.searchString = null;
  checkAll();
  topicReset();
  $('#topic-select').val(0);
  if ($('#category-select').length > 0) {
     $('#category-select').val(0);
     categoryReset();
  }
  unsetScroll();
  $container.empty().masonry('destroy');
  init();
  });  
}


function setSearch() {
  $('input.curl-search').off().click( function(){
  		window.searchString = null;	
  });


  $('input.curl-search').off().keypress(function(event) {
    if ( event.which == 13 ) {
      event.preventDefault();
      window.searchString = $('.curl-search').val();

      if(window.searchString) {
        $container.empty();
        unsetScroll();
        $container.empty().masonry('destroy');
        init();
        setScroll();
        setReset();
      } else {
        window.searchString = null;
        alert('Please enter search value.');
      }
     }
});


  $('.curl-search-button')
    .off()
    .mouseover(function(){
      $(this).addClass('curl-search-button-semitrans');
    })
    .mouseout(function(){
      $(this).removeClass('curl-search-button-semitrans');
    })
    .click(function(){
      window.searchString = $('.curl-search').val();
      if(window.searchString) {
        $container.empty();
        unsetScroll();
        $container.empty().masonry('destroy');
        init();
        setScroll();
        setReset();
      } else {
        window.searchString = null;
        alert('Please enter search value.');
      }
    });
}


function setScroll() {
  $(window).scroll(function()
  {
      if($(window).scrollTop() >= $(document).height() - $(window).height())
      {
        $('.region-content-inner').append('<div id="loading-img"></div>');
	    var articleCount = $('.node-curlitem').length;
        var searchString = $('.curl-search').val();
      if(searchString) {
	      ajaxFetchNodes(articleCount+1, 4, searchString);
	    } else {
	      ajaxFetchNodes(articleCount+1, 4);
	    }
      }
   });
}

function unsetScroll() {
  $(window).off('scroll');
}

var ajaxFetchNodes = function(start, end, searchString) {
    var cat_checked = $('#curlmenu .hidden-checkbox input:checked');
    var cats = [];
    $.each(cat_checked, function(index, c_element) {
      cats[index] = c_element.value;
    });
    
    var nom_checked_1 = $('#curlmenu .nom-checks-col-1 input:checked');
    var nom_checked_2 = $('#curlmenu .nom-checks-col-2 input:checked');

    var noms = [];
    var noms2 = [];
    
    $.each(nom_checked_1, function(index, n_element) {
      noms[index] = n_element.value;
    });
    
    $.each(nom_checked_2, function(index, n_element) {
      noms2[index] = n_element.value;
    });
    
    window.nomenclature = noms.concat(noms2);
        
    $('#topic-select option:selected').each(function() {
      selectTopic = $(this).val();
    });

   if ($('#category-select').length > 0) {
       $('#category-select option:selected').each(function() {
          selectCategory = $(this).val();
       });
       if(selectCategory > 0) {
         cats = selectCategory;
         }
       }
       
    var postdata = {'categories': cats, 'trigger': 'click', 'start': start, 'end': end, 'keys': window.searchString, 'tid': window.tid, 'topic': selectTopic, 'nomenclature': window.nomenclature, 'landingpage':'yes'};
    $.ajax({
      url: 'curlreader_ajaxpage',
      type: "post",
      data: postdata,
      success: function(data) {

        $('#loading-img').remove();

        if (data === 'No category or topic selected.') {
          $container.append(data);
          return;
        }
      	var addBoxes = $(data);
      	//preload images to avoid bunching in masonry
      	
		newImgs = addBoxes.find('img');
		newImgs.each(function() {
		      $('<img/>')[0].src = $(this).attr('src');
           });
		
		newArticles = addBoxes.find('article');

		newArticles.each(function() {
		      var nodeCurlItem = '#'+$(this).attr('id');
		      if($(nodeCurlItem).length > 0) {
		          $(this).remove();
		          addBoxes.find($(this).parent()).remove();
		          
		      } else {
		              $container.append($(this).parent());
		                      positionArticles('appended', $(this).parent());
		      }
		});
        bindEvents();
        resetCL();
      }
    });
  };

  $('#topic-select').mouseover(function(){
     $(this).children(':first').addClass('hidden');
  });

  $('#topic-select').change(function(){
    unsetScroll();
    $container.empty().masonry('destroy');
    init();
    setReset();
           $(this).blur();
  });
  
   if ($('#category-select').length > 0) {
   
     $('#category-select').mouseover(function(){
       $(this).children(':first').addClass('hidden');
     });

     $('#category-select').change(function(){
       unsetScroll();
       $container.empty().masonry('destroy');
       init();
       setReset();
           $(this).blur();
     });
  }
  
  
function topicReset(topicTid) {
  if(topicTid) {
    $('#topic-select').val(topicTid);
  } else {
    $('#topic-select').children(':first').removeClass('hidden');
  }
}


function categoryReset(categoryTid) {
  if(categoryTid) {
    $('#category-select').val(categoryTid);
  } else {
    $('#category-select').children(':first').removeClass('hidden');
  }
}

  $('#curlmenu input[type=checkbox]').click(function(){
    unsetScroll();
    setReset();
    $container.empty().masonry('destroy');
    init();
  });

  // node contraction and expansion functions
  var nodeExpand = function(div) {
  
  	$('.masonry').css('transition-property','top');
   	$('.masonry .masonry-brick').css('transition-property','top');

    var $article = div.find('article'),
      id = $article.attr('id'),
      evenOdd = $article.hasClass('even') ? 'even':'odd';
    $.ajax({
      url: 'curlreader_expand',
      data: {'id' : id, 'evenOdd' : evenOdd, 'trigger': 'click'},
      type: 'post',
      success: function(data) {
        var $newArticle = $(data).find('article');
        $newArticle.addClass(evenOdd);
        $newArticle.find('.content').hide();
        $newArticle.find('.topics').hide();
        $newArticle.find('.social-links').hide();
        $article.replaceWith($newArticle);
        $newArticle.find('.content').slideDown();
        $newArticle.find('.topics').fadeIn(2000);
        $newArticle.find('.social-links').fadeIn(2200);
        $newArticle.find('.contractor').click(function(){
          nodeContract($(this).closest('.item'));
        });
        expandInit();
        resetCL();
        positionArticles('expand');
      }
    });
  };

  var nodeContract = function(div) {
    var $article = div.find('article'),
      id = $article.attr('id'),
      evenOdd = $article.hasClass('even') ? 'even':'odd';
    $.ajax({
      url: 'curlreader_contract',
      data: {'id' : id, 'evenOdd' : evenOdd, 'trigger': 'click'},
      type: 'post',
      success: function(data) {
        var $newArticle = $(data).find('article');
        $newArticle.addClass(evenOdd);
        $article.replaceWith($newArticle);
        $newArticle.find('div.expander').click(function(){
          nodeExpand($(this).closest('.item'));
        });
        resetCL();
        positionArticles('contract');
      }
    });
  };


  // main init function
  function init() {
    $container.empty();
	$container.imagesLoaded( function(){
    $container.masonry({
      itemSelector: '.item',
      columnWidth: 460,
      gutterWidth: 20
            });
	});
	
    setSearch();
    ajaxFetchNodes(0,6);
    setScroll();
  } //end init

  function bindEvents() {
    //topic links
    $('a.topic-link').off().click(function(e){
      setReset();
      unsetScroll();
      e.preventDefault();
      var topicTid = $(this).attr('id').replace("topicTid-","");
      topicReset(topicTid);
      unsetScroll();
      $container.empty().masonry('destroy');
      init();
    });

    //category/publication links
    $('.publication a').off().click(function(e){
      setReset();
      window.nomenclature = null;
      e.preventDefault();
      var pubTid = $(this).attr('id').replace("pubTid-","");
//      uncheckOthers(pubTid);
//       topicReset();
      unsetScroll();
      $container.empty().masonry('destroy');
      init();
    });

    $('.nomenclature a').off().click(function(e){
    setReset();
      e.preventDefault();
      var eyebrow = $(this).parent().parent();
//      uncheckOthers($(eyebrow.children(":first").html()).attr('id').replace("nomTid-",""));
      var catTid = $(this).attr('id').replace("nomTid-","");
      window.nomenclature = catTid;
      if($("#nom-checks").length > 0) {
            uncheckOthers(catTid);
      }
      
      topicReset();
      unsetScroll();
      $container.empty().masonry('destroy');
      init();
    });

    $('.expander').off().click(function(e){
      e.preventDefault();
      nodeExpand($(this).closest('.item'));
    });
  }

  //Social links functions
  var socialpopupwidth = window.screen.width / 2 - 600 / 2;
  var socialpopupheight = window.screen.height / 2 - 600 / 2;
  var socialarticleurl = window.location;
  var openShareWindow = function(event, link){
    window.open(link, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600,left=' + socialpopupwidth + ',top=' + socialpopupheight);
    event.preventDefault();
  }

  function expandInit() {

    $('.edit-date').css('border','solid 1px red');
  
    $('.edit-date').click(function(){
      dateEdit($(this));
    });


    //Facebook share
    var articleURL = $('#article-url').html();
    $('#article-url').css('display','none');
    $('.facebook-social').click(function(event){
      var facebookShareLink = String('http://www.facebook.com/sharer/sharer.php?u=' + articleURL);
      openShareWindow(event, facebookShareLink);
      }).css('opacity','0.6')
      .mouseover(function(){$(this).css('opacity','1')})
      .mouseout(function(){$(this).css('opacity','0.6')});

    //Twitter share
    $('.twitter-social').click(function(event){
      var twitterShareLink = 'https://twitter.com/share';
      openShareWindow(event, twitterShareLink);
      }).css('opacity','0.6')
      .mouseover(function(){$(this).css('opacity','1')})
      .mouseout(function(){$(this).css('opacity','0.6')});

    //Google share
    $('.gplus-social').click(function(event){
      var googleShareLink = String('https://plus.google.com/share?url={' + articleURL + '}');
      openShareWindow(event, googleShareLink);
    }).css('opacity','0.6')
      .mouseover(function(){$(this).css('opacity','1')})
      .mouseout(function(){$(this).css('opacity','0.6')});

    //Linkedin share
    $('.linkedin-social').click(function(event){
      var linkedinShareLink = String('http://www.linkedin.com/shareArticle?mini=true&url={' + articleURL + '}');
      openShareWindow(event, linkedinShareLink);
    }).css('opacity','0.6')
      .mouseover(function(){$(this).css('opacity','1')})
      .mouseout(function(){$(this).css('opacity','0.6')});
  }


  function resetCL() {
    $('div.contextual-links-wrapper', context).once('contextual-links', function () {
      var $wrapper = $(this);
      var $region = $wrapper.closest('.contextual-links-region');
      var $links = $wrapper.find('ul.contextual-links');
      var $trigger = $('<a class="contextual-links-trigger" href="#" />').text(Drupal.t('Configure')).click(
        function () {
          $links.stop(true, true).slideToggle(100);
          $wrapper.toggleClass('contextual-links-active');
          return false;
          }
        );
        // Attach hover behavior to trigger and ul.contextual-links.
        $trigger.add($links).hover(
          function () { $region.addClass('contextual-links-region-active'); },
          function () { $region.removeClass('contextual-links-region-active'); }
        );
        // Hide the contextual links when user clicks a link or rolls out of the .contextual-links-region.
        $region.bind('mouseleave click', Drupal.contextualLinks.mouseleave);
        // Prepend the trigger.
        $wrapper.prepend($trigger);
      });

/**
 * Disables outline for the region contextual links are associated with.
 */
    if(Drupal.contextualLinks) {
      Drupal.contextualLinks.mouseleave = function () {
        $(this)
          .find('.contextual-links-active').removeClass('contextual-links-active')
          .find('ul.contextual-links').hide();
      };
    }
  }

  function positionArticles(state, data) {
    if (state === undefined) return;

    if (state === 'reload')
    	$container.imagesLoaded( function(){
           $container.masonry(state);
        });
    else if (state === 'appended') {
    	$container.imagesLoaded( function(){

      $container.masonry('appended', data, false);
      });
    } else {
      setTimeout(function(){
      	$container.imagesLoaded( function(){

       $container.masonry('reload');
       });
      },500);
    }
  }

  function uncheckOthers(tid) {
    $('#curlmenu .nom-checks-col-1 input[type=checkbox]').each(function(){
      if($(this).attr('value')!=tid) {
        $(this).prop('checked',false);
      } else {
        $(this).prop('checked',true);
      }
    });
    $('#curlmenu .nom-checks-col-2 input[type=checkbox]').each(function(){
      if($(this).attr('value')!=tid) {
        $(this).prop('checked',false);
      } else {
        $(this).prop('checked',true);
      }
    });

  }

  function checkAll() {
    $('#curlmenu input[type=checkbox]').each(function(){
        $(this).prop('checked',true);
    });
  }

  //page load
 if($('body').hasClass('context-chazen-global-insights')) {
    $('body').attr('data-ajax-ready', 'true');
    topicReset();
    $('#topic-select').val(0);
    init();
  }
 if($('body').hasClass('context-ideas-at-work')) {
    $('body').attr('data-ajax-ready', 'true');
    topicReset();
    $('#topic-select').val(0);
    init();
  }
 if($('body').hasClass('context-columbia-business')) {
    $('body').attr('data-ajax-ready', 'true');
    topicReset();
    $('#topic-select').val(0);
    init();
  }
 if($('body').hasClass('context-newsroom')) {
    $('body').attr('data-ajax-ready', 'true');
    topicReset();
    $('#topic-select').val(0);
    init();
  }
 if($('body').hasClass('context-video-library')) {
    $('body').attr('data-ajax-ready', 'true');
    $('#topic-select').val(0);
        topicReset();

    $('#category-select').val(0);
        categoryReset();

    init();
  }
  
//   Featured Channel for video action

$('.featured-channels a').click(function(event){

	$('.curl-search').val('');
  	window.nomenclature = null;
  	window.searchString = null;
  	checkAll();
  	topicReset();
  	$('#topic-select').val(0);
  	if ($('#category-select').length > 0) {
     	$('#category-select').val(0);
     	categoryReset();
  	}
  	unsetScroll();
  	$container.empty().masonry('destroy');
//   	init();

	var ident = $(this).attr('id');
	
	$('select#category-select option').each(function(){
	    if($(this).html() == ident) {
	            	$('#category-select').val($(this).val());
	    }
	});
	   unsetScroll();
	   init();
       setReset();

	event.preventDefault();
});

  
  
  }
}

$.fn.preload = function() {
    this.each(function(){
        $('<img/>')[0].src = this;
    });
}


function dateEdit($dateField) {
   var dateInput = $('<input style="font-size: 12px; display: block; float: left; margin-left: 90px;" value="'+$dateField.html()+'"></input>');
   var dateInputSubmit = $('<div style="font-size: 12px; width: 44px; height: 20px; margin-left: 2px; cursor: pointer; border-radius: 2px; border: solid 1px #777; background-color: #333; color: #eee;  display: block; float: left;">Save</div>');
   dateInput.insertAfter($dateField);
   dateInputSubmit.insertAfter(dateInput);
   $dateField.hide();
   dateInputSubmit.click(function(){
        var nid = $dateField.parent().parent().attr('id').slice(14);
        var dateValue = dateInput.val();
         ajaxSetDate(nid, dateValue);
   });
}


var ajaxSetDate = function(nid, dateValue) {
    var postdata = {'nid': nid, 'dateValue': dateValue};
    $.ajax({
      url: 'curlreader_ajaxSetDate',
      type: "post",
      data: postdata,
      success: function(data) {
        if(data = "New Date Saved") {
        location.reload(); 
        } else {
          alert(data);
        }
      }
    });
 

    
  };
  

})(jQuery);
