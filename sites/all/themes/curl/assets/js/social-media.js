function getFacebookFeed(callback, userFilter) {
	//// console.log("getting feed");
	$.getJSON('/themes/cbs/app/social/social.php?type=facebook', function(data) {
	  //// console.log("facebook data received:");
	  
		var data = eval('(' + data + ')');
		//// console.log(data);
		var feed = [];
	  
		$(data.data).each(function() {
				
			if (userFilter && this.from.name != userFilter) return false;

			var item = {};
			item.message = this.message;
			item.timestamp = new Date(this.created_time);
			item.network = 'facebook';
			item.user = this.from.name;
			
				feed.push(item);
		});
	  
	callback.call(this, feed);
	  
	});
}

function getTwitterFeed(callback, userFilter) {
	$.getJSON('/themes/cbs/app/social/social.php?type=twitter', function(data) {
	  //// console.log("twitter feed received:");
	  
	  var feed = [];
	  
	  $(data).each(function() {
			//// console.log(data);
			
			if (userFilter && this.user.screen_name != userFilter) return false;
			
			var item = {};
			item.message = this.text;
			item.timestamp = new Date(this.created_at);
			item.network = 'twitter';
			item.user = this.user.screen_name
			
	  		feed.push(item);
	  });
	  
	  callback.call(this, feed);
	});
}

function process(platform, feed) {
	feedData = feedData.concat(feed);
	readyCount++;
	
	if (readyCount < feedCount) return false;
	
	buildUI();
}

function buildUI() {
	feedData.sort(function(x, y){
	    return x.timestamp - y.timestamp;
	});

	feedData = feedData.reverse().slice(0, 4);
	
	//// console.log(feedData);
	
	var html = '';
	var isFirst = true;
	var feed = $('.social-feed .feed');
	
	$(feedData).each(function() {
		if (this.message) {
			this.message = this.message.replace(/(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/g,'<a href="$1">$1</a>');
			html += '<li class="' + this.network + '">' + 
			        '<h2>' + this.user + '<a href="https://twitter.com/Columbia_Biz" target="_blank"></a></h2>' +
			        '<p>&quot;' + this.message + '&quot;</p>' +
			        '</li>';
                                    
  		}
	});

	feed.html(html);
	//// console.log("all feeds ready");
	//// console.log(feedData);
	
}

var feedData = [];
var feedCount = 2;
var readyCount = 0;
	
$(document).ready(function() {
	return false; // DEBUG
	
	getFacebookFeed(function(feed) {
		process('facebook', feed);
	}, 'Columbia Business School');	
	
	getTwitterFeed(function(feed) {
		process('twitter', feed);
	}, 'ColumbiaBiz');
	
});
