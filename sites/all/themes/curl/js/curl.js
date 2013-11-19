(function ($) { 

$('#edit-date').hide();

if($('#edit-field-curlitem-pub-date-und-0-value')!='undefined') {
    var unix_date_value = $('#edit-field-curlitem-pub-date-und-0-value').html();
//    alert($('#edit-field-curlitem-pub-date-und-0-value').length);
}

function convertTimestamp() {
	var timestampField = document.getElementById('inputTimestamp');
	var timestampValue = parseInt(timestampField.value);
	if(isNaN(timestampValue) || timestampValue != timestampField.value) {
		document.getElementById('outputDatabase').innerHTML = "Timestamp is not a number";
		document.getElementById('outputLocal').innerHTML = "Timestamp is not a number";
		document.getElementById('outputUTC').innerHTML = "Timestamp is not a number";
	}
	else {
		var dt = new Date(timestampValue*1000);
		document.getElementById('outputDatabase').innerHTML = dt.getFullYear() + '-' + pad(dt.getMonth()+1, 2) + '-' + pad(dt.getDate(), 2) + ' ' + pad(dt.getHours(), 2) + ':' + pad(dt.getMinutes(), 2) + ':' + pad(dt.getSeconds(), 2);
		document.getElementById('outputLocal').innerHTML = dt.toLocaleString();
		document.getElementById('outputUTC').innerHTML = dt.toUTCString();
	}
}
	
})(jQuery);

