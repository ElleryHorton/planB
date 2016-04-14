// business logic layer

var C = require('./const.js');

function random(min, max) {
	return Math.floor((Math.random() * max) + min); 
}

function person(sex, age, type, score, lat, lng) {
	return {location: [lat, lng], sex:sex, age:age, type:type, score:score}
}

module.exports = {

nearby : function(db, distance, limit, logMethod, response) {
	var people = db.collection(C.NAME.PEOPLE);
	people.geoNear(1,2, {maxDistance:distance, limit:limit}, function(err, result) {
		var r = {};
		if (result != null) {
			r.results = result.results;
			r.count = result.results.length;
		} else {
			r.results = null;
			r.count = 0;
		}
		db.close();
		logMethod(response, r);
	});
},

addPerson : function(lat, lng) {
	return person(random(0,1), random(0,4), random(0,9), random(1,5), lat, lng);
}

}