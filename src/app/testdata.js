// test data library

var C = require("../const.js");
var places = require("../app/places.js");
var people = require("../app/people.js");

function log_test_data_inserted(response, data) {
	C.LOG.LOW("Test Data inserted");
}

function randomNumber(min, max, format) {
	var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
	return Math.floor((Math.random() * max) + min) * plusOrMinus / (1/format); 
}

function randomPlaces(place, count, offset, distance, spacing) {
	var locations = [];
	for (var i = 0; i < count; i++)
	{
		var newLat = place.location[0] + randomNumber(offset, distance, spacing);
		var newLng = place.location[1] + randomNumber(offset, distance, spacing);
		locations.push(places.createPlace(i.toString(), newLat, newLng));
	}
	return locations;
}

function randomPlace(place, offset, distance, spacing) {
	var newLat = place.location[0] + randomNumber(offset, distance, spacing);
	var newLng = place.location[1] + randomNumber(offset, distance, spacing);
	return places.createPlace(i.toString(), newLat, newLng);
}

function insertPlacesInto(collection, callback_responseHandler) {	
	var count = 200;
	var min = 0;
	var max = 10;
	collection.insert(randomPlaces(C.RALEIGH, count, min, max, places.SPACING.CLOSE), callback_responseHandler);
}

function insertPeopleInto(collection, callback_responseHandler) {
	var min = 0;
	var max = 10;
	var spacing = places.SPACING.CLOSE;
	var peeps = [
		people.create(randomPlace(C.RALEIGH, min, max, spacing)),
		people.create(1.1, 2.1),
		people.create(1.1, 2.1),
		people.create(1.1, 2.1),
		people.create(1.1, 2.1),
		people.create(1.1, 2.1),
		people.create(1.1, 2.1),
		people.create(1.1, 2.1),
		people.create(1.1, 2.1),
		people.create(1.1, 2.1),
		people.create(1.1, 2.1),
		people.create(1.1, 2.1),
		people.create(1.1, 2.1),
		people.create(1.1, 2.1),
		people.create(1.1, 2.1),
		people.create(1.1, 2.1),
		people.create(1.1, 2.1),
		people.create(1.1, 2.1),
		people.create(1.1, 2.1),
		people.create(101.1, 102.1)
	];
	
	collection.insert(peeps, callback_responseHandler);
}

module.exports = {

purge : function (db) {
	var collection = db.collection(C.NAME.PEOPLE);
	collection.drop();
	C.LOG.LOW("Test Data purged");
	db.close();
},

setup : function (db) {
    var collection = db.collection(C.NAME.PEOPLE);
    collection.createIndex({ location: "2d" }, { background: false });
    C.LOG.LOW("Index Created: { location: \"2d\" }");
    db.close();
},

insert : function (db) {
	var collection = db.collection(C.NAME.PEOPLE);
    //insertPeopleInto(
	insertPlacesInto(collection,
        people.nearby(db, C.RALEIGH, 1, 4, log_test_data_inserted, null));
},

all : function (db, callback_json) {
	var people = db.collection(C.NAME.PEOPLE);
	people.find().toArray(function(err, items) {
		var r = {};
		if (err) {
			r.count = 0;
			r.results = null;
			r.ok = false;
		} else {
			if (items != null) {
				r.count = items.length;
				r.results = items;
				r.ok = true;
			} else {
				r.count = 0;
				r.results = null;
				r.ok = true;
			}
		}
		db.close();
		callback_json(r);
	});
},

}