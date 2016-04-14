// server, routing, and responding to requests

var assert = require('assert');

var express = require('express');
var app = express();
var fs = require('fs');

app.get('/', function (request, response) {
   fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       response.end( data );
   });
});

app.get('/near', function (request, response) {
  var db = require('./db.js');
  db.nearby(respond, response);
});

function respond(response, data)
{
	console.log(data);
	response.end(JSON.stringify(data));
}

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
  
  var db = require('./db.js');
  db.execute(insert_data);
});

function insert_data (err, db)
{
	if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	} else {
		var people = require('./people.js');
		people.test(db, people.nearby(db, 1, 4, log, null));
	}
}

function log(response, data)
{
	console.log("Test Data inserted");
}