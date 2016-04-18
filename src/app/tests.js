// tests

var C = require('../const.js');
var assert = require('assert');

module.exports = {

run : function () {
	testWebAPI(api_all_data, '/all');
	testWebAPI(api_near, '/near');
	testWebAPI(api_near_place, '/near?lat=35.78&lng=-78.64');
	//testWebAPI(api_near_filter, '/near?lat=35.78&lng=-78.64&dst=2&lmt=4');
	testDB(people_nearby_limits);
}

}

// WebAPI TEST SUITE
function api_all_data (json) {
    assert_equal(20, json.results.length, "api_all_data");
}
function api_near(json) {
	assert_equal(C.DEFAULT.LIMIT, json.results.length, "api_near");
}
function api_near_place (json) {
	assert_equal(C.DEFAULT.LIMIT, json.results.length, "api_near_place");
}
function api_near_filter (json) {
	assert_equal(4, json.results.length, "api_near_filter");
}

// DB TEST SUITE
function people_nearby_limits(db) {
	var limit = 3;
	var people = require(C.PEOPLE);
	people.nearby(db, C.RALEIGH, C.DEFAULT.DISTANCE, limit, function (response, json) {
		assert_equal(limit, json.results.length, "db_people_nearby_limits");
	}, null);
}

// TEST HARNESSES
function testWebAPI(testMethod, path) {
	var http = require('http');
	var options = {
	  hostname: 'localhost',
	  path: path,
	  port: 8081,
	  method: 'GET'
	};
	var req = http.request(options, function(res) {
	  res.setEncoding('utf8');
	  res.on('data', function (data) {testMethod(JSON.parse(data))} );
	});
	req.on('error', function(e) {
	  assert(false, JSON.stringify(options));
	});
	req.end();
}

function testDB(testMethod) {
	var DAL = require(C.DAL);
	DAL.execute(testMethod);
}

function assert_equal(expected, actual, message) {
	assert.equal(expected, actual,
		"failed: " + message + " (expected: " + expected + " actual: " + actual + ")");
	C.LOG.PASS(message);
}
