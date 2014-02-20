var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initialize() {
	directionsDisplay = new google.maps.DirectionsRenderer();
	var mapOptions = {
		center: new google.maps.LatLng(14.5833, 120.9667),
		zoom: 12
	};
	var start = /** @type {HTMLInputElement} */(document.getElementById('start'));
	var destination = /** @type {HTMLInputElement} */(document.getElementById('end'));
	  
	var bounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(15.00, 119.00),
		new google.maps.LatLng(13.00, 121.00));
	
	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	
	var autocompleteStart = new google.maps.places.Autocomplete(start);
	var autocompleteEnd = new google.maps.places.Autocomplete(destination);

	autocompleteStart.setBounds(bounds);
	autocompleteEnd.setBounds(bounds);
	
	directionsDisplay.setMap(map);
}

function calcRoute() {
	var start = document.getElementById("start").value;
	var end = document.getElementById("end").value;
  
  var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);