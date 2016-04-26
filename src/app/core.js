// business logic and integration layer

var C = require("../const.js");
var DAL = require("../app/dal.js");
var people = require("../app/people.js");

module.exports = {

near : function (responseHandler, response) {
	DAL.execute(function (db) {
		people.nearby(db, C.RALEIGH, C.DEFAULT.DISTANCE, C.DEFAULT.LIMIT, responseHandler, response);
	});
},

near_place : function (place, responseHandler, response) {
	DAL.execute(function (db) {
		people.nearby(db, place, C.DEFAULT.DISTANCE, C.DEFAULT.LIMIT, responseHandler, response);
	});
},

near_filter : function (place, distance, limit, responseHandler, response) {
	DAL.execute(function (db) {
		people.nearby(db, place, distance, limit, responseHandler, response);
	});
},

add : function (place, responseHandler, response) {
	DAL.execute(function (db) {
		people.add(db, place, responseHandler, response);
	});
}

}