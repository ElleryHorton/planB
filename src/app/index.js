// server, routing, and responding to requests

var C = require('../const.js');
var express = require('express');
var app = express();
var fs = require('fs');

// routing
function handleResponse(response, data) {
  var json = JSON.stringify(data);
  if (json.ok) {
	  response.end(json);
  } else {
    response.end(json);
  }
}
app.get(C.ROUTE.ROOT, function (request, response) {
   fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
       response.end( data );
   });
});
app.get(C.ROUTE.NEAR, function (request, response) {
  var core = require(C.CORE);
  if ((typeof request.query.lat) == 'undefined' || (typeof request.query.lng) == 'undefined') {
    core.near(handleResponse, response);
  } else if ((typeof request.query.dst) == 'undefined' || (typeof request.query.lmt) == 'undefined') {
    var place = { location: [parseFloat(request.query.lat), parseFloat(request.query.lng)] };
    core.near_place(place, handleResponse, response);
  } else {
    var place = { location: [parseFloat(request.query.lat), parseFloat(request.query.lng)] };
    core.near_filter(place, parseFloat(request.query.dst), parseInt(request.query.lmt), handleResponse, response);
  }
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