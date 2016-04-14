// db pass-thru layer to handle connecting and errors

var C = require('./const.js');

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

results_multiple : function(err, result, db, logMethod, response) {
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
},

results_single : function(err, data, db, logMethod, response) {
	var r = {};
	if (err) {
		r.err = err;
		r.success = false;
		r.results = null;
		r.count = 0;
	} else {
		r.success = true;
		r.results = data;
		r.count = 1;
	}
	db.close();
	logMethod(response, r);
}

}