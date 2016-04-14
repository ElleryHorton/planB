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

results : function(err, result, db, logMethod, response) {
	var r = {};
	if (err) {
		r.err = err;
		r.ok = false;
		r.results = null;
	}
	if (result != null) {
		r.ok = true;
		r.results = result.results;
	} else {
		r.ok = true;
		r.results = null;
	}
	db.close();
	logMethod(response, r);
},

results_obj : function(err, data, db, logMethod, response) {
	var r = {};
	if (err) {
		r.err = err;
		r.ok = false;
		r.results = null;
	} else {
		r.ok = true;
		r.results = data;
	}
	db.close();
	logMethod(response, r);
},

results_ok : function(err, data, db, logMethod, response) {
	var r = {};
	if (err) {
		r.ok = false;
	} else {
		r.ok = true;
	}
	db.close();
	logMethod(response, r);
}

}