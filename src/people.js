// business logic layer

var C = require('./const.js');

function random(min, max) {
	return Math.floor((Math.random() * max) + min); 
}

function person(sex, age, type, score, lat, lng) {
	return {location: [lat, lng], sex:sex, age:age, type:type, score:score}
}

module.exports = {

nearby : function(db, place, distance, limit, logMethod, response) {
	var people = db.collection(C.NAME.PEOPLE);
	people.geoNear(place.location[0], place.location[1], {maxDistance:distance, limit:limit}, function(err, result) {
		var r = {};
		if (err) {
			r.err = err;
			r.success = false;
			r.results = null;
			r.count = 0;
		}
		if (result != null) {
			r.success = true;
			r.results = result.results;
			r.count = result.results.length;
		} else {
			r.success = true;
			r.results = null;
			r.count = 0;
		}
		db.close();
		logMethod(response, r);
	});
},

add : function (db, place, logMethod, response){
	var collection = db.collection(C.NAME.PEOPLE);
	collection.insert(module.exports.create(place.location[0], place.location[1]), function(err, result) {
		var r = {};
		if (err) {
			r.err = err;
			r.success = false;
			r.results = null;
			r.count = 0;
		} else {
			r.success = true;
			r.results = place;
			r.count = 1;
		}
		db.close();
		logMethod(response, r);
	});
},

create : function(lat, lng) {
	return person(random(0,1), random(0,4), random(0,9), random(1,5), lat, lng);
}

}