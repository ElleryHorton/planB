var C = require('../const.js');
var assert = require('assert');

function assert_notEqual(expected, actual, message) {
    assert.notEqual(expected, actual);
    C.LOG.PASS(message);
}

function verifyLocationExists(response, data) {
	assert.equal(1, data.count);
	var location = data.results[0].location;
	assert.notEqual(location, null);
	assert.equal(2, location.length);
	C.LOG.PASS("test_add_LatLng");
}

function testAdd(response, data) {
    testdata.all(verifyLocationExists, response);
}

var core = require(C.CORE);
var testdata = require(C.TESTDATA);
var response = "";
core.add(testdata.LatLng, testAdd, response);