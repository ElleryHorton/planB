// business logic layer

var C = require("../const.js");
var DAL = require("../app/dal.js");

function random(min, max) {
	return Math.floor((Math.random() * max) + min); 
}

function person(sex, age, type, score, place) {
	return {location:place.location, sex:sex, age:age, type:type, score:score}
}

module.exports = {

nearby : function(db, place, distance, limit, responseHandler, response) {
    var people = db.collection(C.NAME.PEOPLE);
	people.geoNear(place.location[0], place.location[1], {maxDistance:distance, limit:limit}, function(err, result) {
	    DAL.results(err, result, db, responseHandler, response);
	});
},

add: function (db, place, responseHandler, response) {
    var collection = db.collection(C.NAME.PEOPLE);
	collection.insert(module.exports.create(place), function(err, result) {
		DAL.results_ok(err, place, db, responseHandler, response);
	});
},

create : function(place) {
	return person(random(0,1), random(0,4), random(0,9), random(1,5), place);
}

}