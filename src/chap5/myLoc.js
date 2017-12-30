window.onload = getMyLocation;

var ourCords = {
  latitude: 47.624851,
  longitude: -112.52099
}

function getMyLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayLocation, displayError);
  }else {
    alert("Oops, no geolocation support detected");
  }
  
}

function displayLocation(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  var div = document.getElementById("location");
  div.innerHTML = "You are at latitude: " + latitude + ", Longitude: " + longitude;
  div.innerHTML += " within " + position.coords.accuracy + " meters accuracy";

  var km = computeDistance(position.coords, ourCords);

  var distance = document.getElementById("distance");
  distance.innerHTML = "You are " + km + " km from wickedly smart HQ";

  showMap(position.coords);
}

function displayError(error) {
	var errorTypes = {
		0: "Unknown error",
		1: "Permission denied",
		2: "Position is not available",
		3: "Request timeout"
	};
	var errorMessage = errorTypes[error.code];
	if (error.code == 0 || error.code == 2) {
		errorMessage = errorMessage + " " + error.message;
	}
	var div = document.getElementById("location");
	div.innerHTML = errorMessage;
}

// Uses the Spherical Law of Cosines to find the distance
// between two lat/long points
//
function computeDistance(startCoords, destCoords) {
	var startLatRads = degreesToRadians(startCoords.latitude);
	var startLongRads = degreesToRadians(startCoords.longitude);
	var destLatRads = degreesToRadians(destCoords.latitude);
	var destLongRads = degreesToRadians(destCoords.longitude);

	var Radius = 6371; // radius of the Earth in km
	var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
					Math.cos(startLatRads) * Math.cos(destLatRads) *
					Math.cos(startLongRads - destLongRads)) * Radius;

	return distance;
}

function degreesToRadians(degrees) {
	radians = (degrees * Math.PI)/180;
	return radians;
}

// google maps code

//var googleLatAndLong = new google.maps.LatLng(latitude, longitude);

var map;

function showMap(coords) {
  var googleLatAndLong = new google.maps.LatLng(coords.latitude, coords.longitude);

  var mapOptions = {
    zoom: 16,
    center: googleLatAndLong,
    mapTypeID: google.maps.MapTypeId.ROADMAP
  };

  var mapDiv = document.getElementById("map");
  map = new google.maps.Map(mapDiv, mapOptions);

  var title = "Your Location";

  var content = "You are here " + coords.latitude + " " + coords.longitude;
  addMarker(map, googleLatAndLong, title, content);
  
}

function addMarker(map, latlong, title, content) {

  var markerOptions = {
    position: latlong,
    map: map,
    title: title,
    clickable: true
  }

  var marker = new google.maps.Marker(markerOptions);

  var infoWindowOptions = {
    content: content,
    position: latlong
  }

  var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

  google.maps.event.addListener(marker, "click", function() {infoWindow.open(map);})
}