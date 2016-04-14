// places  

module.exports = {

ZOOM : {
	FAR : 12,
	WIDE : 15,
	CLOSE : 18,
	TIGHT : 21
},
SPACING : {
	FAR : 0.01,
	WIDE : 0.001,
	CLOSE : 0.0001,
	TIGHT : 0.00001
},
toPlace : function (LatLng) {
	return {location: [LatLng.lat(), LatLng.lng()]};
},
createPlace : function (name, lat, lng) {
	return {name: name, location: [lat, lng]};
},
createMarker : function (name, place) {
	return {name: name, lat: place.location[0], lng: place.location[1]};
}

}