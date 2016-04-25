// business logic and integration layer

var C = require('../const.js');
var DAL = require(C.DAL);

module.exports = {

near : function (logMethod, response) {
	DAL.execute(function (db) {
		var people = require(C.PEOPLE);
		people.nearby(db, C.RALEIGH, C.DEFAULT.DISTANCE, C.DEFAULT.LIMIT, logMethod, response);
	});
},

near_place : function (place, logMethod, response) {
	DAL.execute(function (db) {
		var people = require(C.PEOPLE);
		people.nearby(db, place, C.DEFAULT.DISTANCE, C.DEFAULT.LIMIT, logMethod, response);
	});
},

near_filter : function (place, distance, limit, logMethod, response) {
	DAL.execute(function (db) {
		var people = require(C.PEOPLE);
		people.nearby(db, place, distance, limit, logMethod, response);
	});
},

add : function (place, logMethod, response) {
	var places = require(C.PLACES);
	DAL.execute(function (db) {
		var people = require(C.PEOPLE);
		people.add(db, place, logMethod, response);
	});
}

}