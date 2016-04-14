// test library

var C = require('./const.js');

function echo(response, data) {
	console.log("Test Data inserted");
}

function insertInto(collection, callback) {	
	var people = require(C.PEOPLE);
	var peeps = [
		people.addPerson(1, 2),
		people.addPerson(1.1, 2.1),
		people.addPerson(1.1, 2.1),
		people.addPerson(1.1, 2.1),
		people.addPerson(1.1, 2.1),
		people.addPerson(1.1, 2.1),
		people.addPerson(1.1, 2.1),
		people.addPerson(1.1, 2.1),
		people.addPerson(1.1, 2.1),
		people.addPerson(1.1, 2.1),
		people.addPerson(101.1, 102.1)
	];
	
	collection.insert(peeps, callback);
}

module.exports = {

insert_data : function (db) {
	var people = require(C.PEOPLE);
	var collection = db.collection(C.NAME.PEOPLE);
	collection.drop();
	collection.createIndex(
		{location: "2d"}, insertInto(
			collection, people.nearby(db, 1, 4, echo, null))
	);
}

}