// server, routing, and responding to requests

var C = require('./const.js');
var express = require('express');
var app = express();
var fs = require('fs');

var assert = require('assert');

// routing
function handleResponse(response, data) {
	console.log(data);
	response.end(JSON.stringify(data));
}
app.get(C.ROUTE.ROOT, function (request, response) {
   fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       response.end( data );
   });
});
app.get(C.ROUTE.NEAR, function (request, response) {
  var db = require(C.DB);
  db.nearby(handleResponse, response);
});

// server start
var server = app.listen(C.PORT.MAIN, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
  
  var db = require(C.DB);
  var test = require(C.TEST);
  db.execute(test.insert_data);
});