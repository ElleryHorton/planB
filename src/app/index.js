// server, routing, and responding to requests

var C = require('../const.js');
var express = require('express');
var app = express();
var fs = require('fs');

// routing
function handleResponse(response, data) {
	response.end(JSON.stringify(data));
}
app.get(C.ROUTE.ROOT, function (request, response) {
   fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
       response.end( data );
   });
});
app.get(C.ROUTE.NEAR, function (request, response) {
  var core = require(C.CORE);
  //if (request.query.length == 0) {
    core.near(handleResponse, response);
  //} else if ((typeof request.query.dst) == 'undefined' || (typeof request.query.lmt) == 'undefined') {
  //  var place = { location: [request.query.lat, request.query.lng] };
  //  core.near_place(place, handleResponse, response);
  //} else {
  //  var place = { location: [request.query.lat, request.query.lng] };
  //  core.near_filter(place, request.query.dst, request.query.lmt, handleResponse, response);
  //}
});
app.get(C.ROUTE.NEAR_PLACE, function (request, response) {
  var core = require(C.CORE);
  var place = { location: [req.params.lat, req.params.lng] };
  core.near_place(place, handleResponse, response);
});
app.get(C.ROUTE.NEAR_FILTER, function (request, response) {
  var core = require(C.CORE);
  var place = { location: [req.params.lat, req.params.lng] };
  core.near_filter(place, req.params.dst, req.params.lmt, handleResponse, response);
});
app.get(C.ROUTE.ALL, function (request, response) {
  var testdata = require(C.TESTDATA);
  testdata.all(handleResponse, response);
});
app.get(C.ROUTE.ADD, function (request, response) {
  var core = require(C.CORE);
  var testdata = require(C.TESTDATA);
  core.add(testdata.LatLng, handleResponse, response);
});

// server start
var server = app.listen(C.PORT.MAIN, function () {
  var host = server.address().address
  var port = server.address().port
  C.LOG.LOW("Example app listening at http://" + host + ":" + port)
  
  var tests = require(C.TESTS);
  tests.run();
});