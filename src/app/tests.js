// tests

var C = require('../const.js');
var assert = require(C.ASSERT);

module.exports = {

run : function () {
	testWebAPI(positiveTest, api_all_data, '/all');
	testWebAPI(positiveTest, api_near, '/near');
	testWebAPI(positiveTest, api_near_place, '/near?lat=35.78&lng=-78.64');
	testWebAPI(positiveTest, api_near_filter, '/near?lat=35.78&lng=-78.64&dst=2&lmt=4');
	testWebAPI(positiveTest, api_near_filter_bounds_lmt, '/near?lat=35.78&lng=-78.64&dst=2&lmt=200');
	testWebAPI(negativeTest, api_add, '/add');
	testDB(people_nearby_limits);
	testDB(testdata_all);
}

}

// WebAPI TEST SUITE
function api_all_data (json) {
    assert.equal(10, json.results.length, "api_all_data");
}
function api_near(json) {
	assert.equal(C.DEFAULT.LIMIT, json.results.length, "api_near");
}
function api_near_place (json) {
	assert.equal(C.DEFAULT.LIMIT, json.results.length, "api_near_place");
}
function api_near_filter (json) {
	assert.equal(4, json.results.length, "api_near_filter");
}
function api_near_filter_bounds_lmt (json) {
	assert.equal(10, json.results.length, "api_near_filter_bounds_lmt");
}
function api_add (json) {
	assert.equal(C.NOT_OK, JSON.stringify(json), "api_add");
}

// DB TEST SUITE
function people_nearby_limits(db) {
	var limit = 3;
	var people = require(C.PEOPLE);
	people.nearby(db, C.RALEIGH, C.DEFAULT.DISTANCE, limit, function (response, json) {
		assert.equal(limit, json.results.length, "db_people_nearby_limits");
	}, null);
}

function testdata_all(db) {
	var testdata = require(C.TESTDATA);
	var response = "";
	testdata.all(function (response, json) {
		assert.equal(200, json.count, "db_testdata_all");
	}, response);
}

// WEB TEST HARNESS
function testWebAPI(testPosOrNeg, testMethod, path) {
	var http = require('http');
	var options = {
	  hostname: 'localhost',
	  path: path,
	  port: 8081,
	  method: 'GET'
	};
	var req = http.request(options, function(res) {
	  res.setEncoding('utf8');
	  res.on('data', function (data) {
		  testPosOrNeg(testMethod, data);
	  });
	});
	req.on('error', function(e) {
		C.LOG.ERR(JSON.stringify(options));
	});
	req.end();
}

function positiveTest(testMethod, data) {
	var json = JSON.parse(data);
	if (json.ok) {
		testMethod(json);
	} else {
		C.LOG.ERR(data);
	}
}

function negativeTest(testMethod, data) {
	var json = JSON.parse(data);
	testMethod(json);
}

// DAL TEST HARNESS
function testDB(testMethod) {
	var DAL = require(C.DAL);
	DAL.execute(testMethod);
}