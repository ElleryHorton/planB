console.log("start");

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://nc-dev-1028:27017/test';
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);

	var people = db.collection('people');
	people.drop();
	people.ensureIndex( {"location": "2d"});
	people.insert( {"location": [1, 2], "type": "m"} );
	people.insert( {"location": [3, 4], "type": "f"} );
	people.find( { "location": { $near : [100, 100] } } )
    db.close();
  }
});

console.log("end");