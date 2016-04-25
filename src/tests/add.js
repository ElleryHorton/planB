var C = require('../const.js');
var assert = require(C.ASSERT);

function verifyLocationExists(response, json) {
	assert.equal(1, json.count, "test_add_countIs1");
	var location = json.results[0].location;
	assert.notEqual(location, null, "test_add_locationNotNull");
	assert.equal(2, location.length, "test_add_locationLengthIs2");
}

function testAdd(response, data) {
    testdata.all(verifyLocationExists, response);
}

var core = require(C.CORE);
var testdata = require(C.TESTDATA);
var response = "";
core.add(C.RALEIGH, testAdd, response);