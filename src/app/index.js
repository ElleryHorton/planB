// server, routing, and responding to requests

var C = require("../const.js");
var express = require('express');
var app = express();
var fs = require('fs');
var core = require("../app/core.js");
var tests = require("../app/tests.js");

// input
function bound(value, min, max) {
  return (value < min) ? min : ((value > max) ? max : value);
}
function parseLimit(value) {
  return bound(parseInt(value), C.MIN.LIMIT, C.MAX.LIMIT);
}
function parseDistance(value) {
  return bound(parseFloat(value), C.MIN.DISTANCE, C.MAX.DISTANCE);
}

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
  if ((typeof request.query.lat) == 'undefined' || (typeof request.query.lng) == 'undefined') {
    core.near(handleResponse, response);
  } else if ((typeof request.query.dst) == 'undefined' || (typeof request.query.lmt) == 'undefined') {
    var place = { location: [parseFloat(request.query.lat), parseFloat(request.query.lng)] };
    core.near_place(place, handleResponse, response);
  } else {
    var place = { location: [parseFloat(request.query.lat), parseFloat(request.query.lng)] };
    core.near_filter(place, parseDistance(request.query.dst), parseLimit(request.query.lmt), handleResponse, response);
  }
});
app.get(C.ROUTE.ALL, function (request, response) {
  core.near_filter(C.RALEIGH, parseDistance(100), parseLimit(100), handleResponse, response);
});
app.get(C.ROUTE.ADD, function (request, response) {
  if ((typeof request.query.lat) == 'undefined' || (typeof request.query.lng) == 'undefined') {
    response.end(C.NOT_OK);
  } else {
    var place = { location: [parseFloat(request.query.lat), parseFloat(request.query.lng)] };
    core.add(place, handleResponse, response);
  }
});

// server start
var server = app.listen(C.PORT.MAIN, function () {
  var host = server.address().address
  var port = server.address().port
  C.LOG.LOW("Example app listening at http://" + host + ":" + port)
  
  tests.run();
});