// business logic and integration layer

var C = require('../const.js');
var DAL = require(C.DAL);

var DEFAULT_DISTANCE = 1;
var DEFAULT_LIMIT = 2;
var MAX_DISTANCE = 10;
var MAX_LIMIT = 10;

module.exports = {

near : function (logMethod, response) {
	DAL.execute(function (db) {
		var people = require(C.PEOPLE);
		people.nearby(db, C.RALEIGH, DEFAULT_DISTANCE, DEFAULT_LIMIT, logMethod, response);
	});
},

near_place : function (place, logMethod, response) {
	DAL.execute(function (db) {
		var people = require(C.PEOPLE);
		people.nearby(db, place, DEFAULT_DISTANCE, DEFAULT_LIMIT, logMethod, response);
	});
},

near_filter : function (place, distance, limit, logMethod, response) {
	DAL.execute(function (db) {
		var people = require(C.PEOPLE);
		people.nearby(db, place, distance, limit, logMethod, response);
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