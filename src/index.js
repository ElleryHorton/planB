var assert = require('assert');
var mongodb = require('mongodb');
var people = require('./people.js');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://nc-dev-1028:27017/test';
MongoClient.connect(url, main);

function main (err, db)
{
	if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	} else {
		console.log('Connection established to', url);
		people.test(db, people.nearby(db, 1, 4));
	}
}