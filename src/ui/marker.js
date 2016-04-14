  var MARKER = {
	blue : "https://mt.google.com/vt/icon?psize=20&font=fonts/Roboto-Regular.ttf&color=ff330000&name=icons/spotlight/spotlight-waypoint-blue.png&ax=44&ay=48&scale=1&text=%E2%80%A2",
	yellow : "http://maps.google.com/mapfiles/ms/icons/yellow.png",
	orange : "http://maps.google.com/mapfiles/ms/icons/orange-dot.png",
	pink : "http://maps.google.com/mapfiles/ms/micons/pink-dot.png",
	purple : "https://maps.gstatic.com/mapfiles/ms2/micons/purple.png",
	red : "https://maps.gstatic.com/mapfiles/ms2/micons/red.png"
  }

  function createMarker(name, lat, lng) {
	return new google.maps.Marker({
		position: new google.maps.LatLng(lat, lng),
		title:name
	});
  }
  
  function createMarker(name, lat, lng, image) {
	return new google.maps.Marker({
		position: new google.maps.LatLng(lat, lng),
		title: name,
		icon: image
	});
  }