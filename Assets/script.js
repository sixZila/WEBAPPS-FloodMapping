function initialize() {
	var mapOptions = {
	center: new google.maps.LatLng(14.5833, 120.9667),
	zoom: 12
	};
	
	var map = new google.maps.Map(document.getElementById("map-canvas"),
	mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);