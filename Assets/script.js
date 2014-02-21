var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var markers = new Array();
var infowindows = new Array();
var floods = [
  ['SM Sucat', 14.484768, 120.993840, '<h1>SM Sucat</h1> <a href="/Assets/floodimg/SMSucat.jpg" data-lightbox="/Assets/floodimg/SMSucat.jpg"><img src="/Assets/floodimg/SMSucat.jpg" class="flood"></a>'],
  ['DLSU', 14.5643, 120.9937, ''],
  ['Vito Cruz', 14.562623, 120.995103, ''],
  ['Olivarez College', 14.479513, 120.997657, ''],
  ['Evacom', 14.475042, 121.001079, ''],
  ['Pascor', 14.506841, 121.001141, '']
];

function initialize() {
	directionsDisplay = new google.maps.DirectionsRenderer();
	var mapOptions = {
		center: new google.maps.LatLng(14.5833, 120.9667),
		zoom: 12,
		styles: [{"featureType":"water","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]},
					{"featureType":"landscape","stylers":[{"color":"#f2e5d4"}]},
					{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},
					{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#333333"}]},
					{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},
					{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},
					{"featureType":"administrative","stylers":[{"visibility":"on"},{"lightness":33}]},
					{"featureType":"road"},{"featureType":"poi.park","elementType":"labels","stylers":
					[{"visibility":"on"},{"lightness":20}]},{},{"featureType":"road","stylers":[{"lightness":10}]}]
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
	setMarkers(map, floods);
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

function setMarkers(map, locations) {
	var image = {
		url: 'Assets/img/FloodHigh.png'
	}

	for (var i = 0; i < locations.length; i++) {
		var flood = locations[i];
		var coords = new google.maps.LatLng(flood[1], flood[2]);
		var marker = new google.maps.Marker({
			position: coords,
			icon: image,
			map: map,
			title: flood[0],
			infoWindowIndex: i
		});
		
		var infowindow = new google.maps.InfoWindow({
			content: flood[3],
			maxWidth: 200
		});

		google.maps.event.addListener(marker, 'click', function(event) {  
			infowindows[this.infoWindowIndex].open(map, this);
        });
		
		infowindows.push(infowindow);
        markers.push(marker);
  }
}

function readfile(f) {
    var fr = new FileReader();
	fr.onload = function(e) {
		alert(fr.result);
	};
	fr.readAsText(f);
}

google.maps.event.addDomListener(window, 'load', initialize);