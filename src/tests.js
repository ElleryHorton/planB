// tests

var C = require('./const.js');
var assert = require('assert');

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
	assert.equal(expected, actual);
	console.log("passed: ", message);
}

// WebAPI TEST SUITE
function api_all_data (json) {
    assert_equal(20, json.results.length, "api_all_data");
}
function api_nearby_limits (json) {
	assert_equal(2, json.results.length, "api_nearby_limits");
}

// DB TEST SUITE
function people_nearby_limits(db) {
	var people = require(C.PEOPLE);
	people.nearby(db, C.RALEIGH, 1, 2, function (response, json) {
		assert_equal(2, json.results.length, "test_people_nearby_limits");
	}, null);
}
function people_add_remove(db) {
}

module.exports = {

run : function () {
	testWebAPI(api_all_data, '/all');
	testWebAPI(api_nearby_limits, '/near');
	testDB(people_nearby_limits);
	testDB(people_add_remove);
}

}