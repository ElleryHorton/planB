// db pass-thru layer to handle connecting and errors

var C = require("../const.js");
var mongodb = require('mongodb');

module.exports = {

execute: function (callback_db) {
	var MongoClient = mongodb.MongoClient;
	var url = 'mongodb://nc-dev-1028:27017/test';
	MongoClient.connect(url, function (err, db) {
		if (err) {
			C.LOG.ERR(err);
		} else {
		    callback_db(db);
		}
	});
},

results: function (err, result, db, responseHandler, response) {
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
		r.ok = false;
		r.results = null;
	}
	db.close();
	responseHandler(response, r);
},

results_obj: function (err, data, db, responseHandler, response) {
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
	responseHandler(response, r);
},

results_ok: function (err, data, db, responseHandler, response) {
	var r = {};
	if (err) {
		r.ok = false;
	} else {
		r.ok = true;
	}
	db.close();
	responseHandler(response, r);
}

}