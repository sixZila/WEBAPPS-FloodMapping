var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var markers = new Array();
var infowindows = new Array();
var floods = [
  ['SM Sucat', 14.484768, 120.993840, '<h3>SM Sucat</h3> Intensity: 3ft <a href="Assets/floodimg/SMSucat.jpg" data-lightbox="Assets/floodimg/SMSucat.jpg"><img src="Assets/floodimg/SMSucat.jpg" class="flood"></a>'],
  ['DLSU', 14.5643, 120.9937, ''],
  ['Vito Cruz', 14.562623, 120.995103, ''],
  ['Olivarez College', 14.479513, 120.997657, ''],
  ['Evacom', 14.475042, 121.001079, ''],
  ['Pascor', 14.506841, 121.001141, '']
];
var kmlLayers;
var kmlInit = false;
var drawerIsOpen = false;
var gotDirections = false;
 
function toggleDrawer() {
	if(!drawerIsOpen && gotDirections) {
		drawerIsOpen = true;
		$("#directions-panel").animate({marginRight: "0px"}, 400);
	}
	else {
		drawerIsOpen = false;
		$("#directions-panel").animate({marginRight: "-390px"}, 400);
	}
}	

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
	directionsDisplay.setPanel(document.getElementById('directions-panel'));
	setMarkers(map, floods);
	kmlLayers = new Array();
}

function toggleLayers() {
	if(kmlInit) {
		for( var index = 0; index < kmlLayers.length; ++index){
    		kmlLayers[index].setMap( kmlLayers[index].getMap() ? null : map );
		}
	}else {
		kmlLayers[0] = new google.maps.KmlLayer({
			url: "http://nababaha.appspot.com/static/marikina-ondoy.KMZ"
		});
		kmlLayers[0].setMap(map);
	
		kmlLayers[1] = new google.maps.KmlLayer({
			url: "http://nababaha.appspot.com/static/manila0-ondoy.KMZ"
		});
		kmlLayers[1].setMap(map);
	
		kmlLayers[2] = new google.maps.KmlLayer({
			url: "http://nababaha.appspot.com/static/manila1-ondoy.KMZ",
		});
		kmlLayers[2].setMap(map);
	
		kmlLayers[3] = new google.maps.KmlLayer({
			url: "http://nababaha.appspot.com/static/manila2-ondoy.KMZ",
		});
		kmlLayers[3].setMap(map);
	
		kmlLayers[4] = new google.maps.KmlLayer({
			url: "http://nababaha.appspot.com/static/manila3-ondoy.KMZ",
		});
		kmlLayers[4].setMap(map);
	
		kmlLayers[5] = new google.maps.KmlLayer({
			url: "http://nababaha.appspot.com/static/manila4-ondoy.KMZ",
		});
		kmlLayers[5].setMap(map);
	
		kmlLayers[6] = new google.maps.KmlLayer({
			url: "http://nababaha.appspot.com/static/manila_gm.KMZ"
		});
		kmlLayers[6].setMap(map);
		kmlInit = true;
	}
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

	gotDirections = true;
	if (window.innerWidth > 767 && !drawerIsOpen)
		toggleDrawer();
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