// business logic and integration layer

var C = require('./const.js');
var DAL = require(C.DAL);

module.exports = {

nearby : function (logMethod, response) {
	DAL.execute(function (db) {
		var people = require(C.PEOPLE);
		people.nearby(db, C.RALEIGH, 1, 2, logMethod, response);
	});
},

add : function (LatLng, logMethod, response) {
	var places = require(C.PLACES);
	var place = places.toPlace(LatLng);
	
	DAL.execute(function (db) {
		var people = require(C.PEOPLE);
		people.add(db, place, logMethod, response);
	});
}

}