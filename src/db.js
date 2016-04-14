// db pass-thru layer to handle connecting and errors

var C = require('./const.js');

function nearby (db, logMethod, response) {
	var people = require(C.PEOPLE);
	// this is where the magic will end
	people.nearby(db, 1, 2, logMethod, response);
}

module.exports = {

execute : function (callback) {
	var mongodb = require('mongodb');
	var MongoClient = mongodb.MongoClient;
	var url = 'mongodb://nc-dev-1028:27017/test';
	MongoClient.connect(url, function (err, db) {
		if (err) {
			console.log('Execute failed. Error:', err);
		} else {
			callback(db);
		}
	});
},

nearby : function (logMethod, response) {
	module.exports.execute(function (db) {
		// this is where the magic will start (LatLng API)
		nearby(db, logMethod, response);
	}
	);
}

}