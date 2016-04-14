// test data library

var C = require('./const.js');

function test_data_done(response, data) {
	console.log("Test Data inserted");
}


function randomNumber(min, max, format) {
	var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
	return Math.floor((Math.random() * max) + min) * plusOrMinus / (1/format); 
}

function randomPlaces(place, count, offset, distance, format) {
	var places = require(C.PLACES);
	var locations = [];
	for (var i = 0; i < count; i++)
	{
		var newLat = place.location[0] + randomNumber(offset, distance, format);
		var newLng = place.location[1] + randomNumber(offset, distance, format);
		locations.push(places.createPlace(i.toString(), newLat, newLng));
	}
	return locations;
}

function insertPlacesInto(collection, callback) {	
	var places = require(C.PLACES);
	var count = 20;
	var min = 0;
	var max = 10;
	collection.insert(randomPlaces(C.RALEIGH, count, min, max, places.SPACING.CLOSE), callback);
}

function insertPeopleInto(collection, callback) {	
	var people = require(C.PEOPLE);
	
	var peeps = [
		people.create(1, 2),
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
	
	collection.insert(peeps, callback);
}

module.exports = {

LatLng : {
	lat : function() { return C.RALEIGH.location[0]; },
	lng : function() { return C.RALEIGH.location[1]; }
},

insert : function (db) {
	var people = require(C.PEOPLE);
	var collection = db.collection(C.NAME.PEOPLE);
	collection.drop();
	collection.createIndex(
		//{location: "2d"}, insertPeopleInto(
		{location: "2d"}, insertPlacesInto(
			collection, people.nearby(db, C.RALEIGH, 1, 4, test_data_done, null))
	);
},

all : function (logMethod, response) {
	var DAL = require(C.DAL);
	DAL.execute(function (db) {
		var people = db.collection(C.NAME.PEOPLE);
		people.find().toArray(function(err, items) {
			var r = {};
			if (items != null) {
				r.count = items.length;
				r.results = items;
			} else {
				r.count = 0;
				r.results = null;
			}
			db.close();
			logMethod(response, r);
		});
	});
},

}