function random(min, max)
{
	return Math.floor((Math.random() * max) + min); 
}

module.exports = {

nearby : function(db, distance, limit)
{
	var people = db.collection('people');
	people.geoNear(1,2, {maxDistance:distance, limit:limit}, function(err, result) {
		if (result != null) {
			console.log('result.results');
			console.log(result.results);
			console.log(result.results.length);
		} else {
			console.log('crap result.results');
		}
		db.close();
	});
},

test : function(db, callback)
{
	var people = db.collection('people');
	people.drop();
	people.createIndex( {location: "2d"}, module.exports.insertData(people, callback) );
},

addPersonRandom : function(lat, lng)
{
	return module.exports.addPerson(random(0,1), random(0,4), random(0,9), random(1,5), lat, lng);
},

addPerson : function(sex, age, type, score, lat, lng)
{
	return {location: [lat, lng], sex:sex, age:age, type:type, score:score}
},

insertData : function(people, callback)
{	
	var peeps = [
		module.exports.addPersonRandom(1, 2),
		module.exports.addPersonRandom(1.1, 2.1),
		module.exports.addPersonRandom(1.1, 2.1),
		module.exports.addPersonRandom(1.1, 2.1),
		module.exports.addPersonRandom(1.1, 2.1),
		module.exports.addPersonRandom(1.1, 2.1),
		module.exports.addPersonRandom(1.1, 2.1),
		module.exports.addPersonRandom(1.1, 2.1),
		module.exports.addPersonRandom(1.1, 2.1),
		module.exports.addPersonRandom(1.1, 2.1),
		module.exports.addPersonRandom(101.1, 102.1)
	];
	
	people.insert(peeps, callback);
}

}