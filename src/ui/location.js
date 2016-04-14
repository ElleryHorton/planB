  var ZOOM = {
	FAR : 12,
	WIDE : 15,
	CLOSE : 18,
	TIGHT : 21
  }
  var SPACING = {
	FAR : 0.01,
	WIDE : 0.001,
	CLOSE : 0.0001,
	TIGHT : 0.00001
  }
  
  function toLocation(LatLng)
  {
	return {lat: LatLng.lat(), lng: LatLng.lng()};
  }
  
  function createLocations(location, count, offset, distance, format)
  {
	var locations = [];
	for (var i = 0; i < count; i++)
	{
		var newLat = location.lat + randomNumber(offset, distance, format);
		var newLng = location.lng + randomNumber(offset, distance, format);
		locations.push(createMarker(i.toString(), newLat, newLng));
	}
	return locations;
  }

  function getMap(location, zoom) {
	var latlng = new google.maps.LatLng(location.lat, location.lng);
	var mapOptions = {
		zoom: zoom,
		center: latlng
	}
	return new google.maps.Map(document.getElementById('map'), mapOptions);
  }