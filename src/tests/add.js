var C = require("../const.js");
var assert = require("../app/assert.js");
var DAL = require("../app/dal.js");
var core = require("../app/core.js");

function verifyLocationExists(json) {
	assert.equal(1, json.count, "test_add_countIs1");
	var location = json.results[0].location;
	assert.notEqual(location, null, "test_add_locationNotNull");
	assert.equal(2, location.length, "test_add_locationLengthIs2");
}

function verifyAdd(response, data) {
	DAL.execute(function (db) {
    	var testdata = require("../app/testdata.js");
	    testdata.all(db, verifyLocationExists);
    });
}

core.add(C.RALEIGH, verifyAdd, null);