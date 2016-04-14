// db pass-thru layer to handle connecting and errors

function nearby (err, db, logMethod, response)
{
	if (err) {
		console.log('Nearby search failed. Error:', err);
	} else {
		var people = require('./people.js');
		// this is where the magic will end
		people.nearby(db, 1, 2, logMethod, response);
		//
	}
}

module.exports = {

execute : function (callback) {
	var mongodb = require('mongodb');
	var MongoClient = mongodb.MongoClient;
	var url = 'mongodb://nc-dev-1028:27017/test';
	MongoClient.connect(url, callback);
},

nearby : function (logMethod, response) {
	module.exports.execute(function (err, db) {
		// this is where the magic will start (LatLng API)
		nearby(err, db, logMethod, response);
	}
	);
}

}