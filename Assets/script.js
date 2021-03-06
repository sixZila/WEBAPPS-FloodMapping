var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var markers = new Array();
var infowindows = new Array();
var floods = [
  ['SM Sucat', 14.484768, 120.993840, '<h1>SM Sucat</h1> <a href="Assets/floodimg/SMSucat.jpg" data-lightbox="Assets/floodimg/SMSucat.jpg"><img src="Assets/floodimg/SMSucat.jpg" class="flood"></a>'],
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
		panControl: false,
		streetViewControl: false,
	};
	var start = /** @type {HTMLInputElement} */(document.getElementById('start'));
	var destination = /** @type {HTMLInputElement} */(document.getElementById('end'));

	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	
	var autocompleteStart = new google.maps.places.Autocomplete(start);
	var autocompleteEnd = new google.maps.places.Autocomplete(destination);

	directionsDisplay.setMap(map);
	setMarkers(map, floods);
	
	var kmzLayer0 = new google.maps.KmlLayer({
			url: "http://nababaha.appspot.com/static/marikina-ondoy.KMZ"
	});
	kmzLayer0.setMap(map);
	
	var kmzLayer1 = new google.maps.KmlLayer({
			url: "http://nababaha.appspot.com/static/manila0-ondoy.KMZ"
	});
	kmzLayer1.setMap(map);
	
	var kmzLayer2 = new google.maps.KmlLayer({
			url: "http://nababaha.appspot.com/static/manila1-ondoy.KMZ",
	});
	kmzLayer2.setMap(map);
	
	var kmzLayer3 = new google.maps.KmlLayer({
			url: "http://nababaha.appspot.com/static/manila2-ondoy.KMZ",
	});
	kmzLayer3.setMap(map);
	
	var kmzLayer4 = new google.maps.KmlLayer({
			url: "http://nababaha.appspot.com/static/manila3-ondoy.KMZ",
	});
	kmzLayer4.setMap(map);
	
	var kmzLayer5 = new google.maps.KmlLayer({
			url: "http://nababaha.appspot.com/static/manila4-ondoy.KMZ",
	});
	kmzLayer5.setMap(map);
	
	var kmzLayer6 = new google.maps.KmlLayer({
			url: "http://nababaha.appspot.com/static/manila_gm.KMZ"
	});
	kmzLayer6.setMap(map);
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

google.maps.event.addDomListener(window, 'load', initialize);

google.maps.event.addDomListener(window, "resize", function() {
	var center = map.getCenter();
	google.maps.event.trigger(map, "resize");
	map.setCenter(center); 
});