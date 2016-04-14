// init test data
var C = require('./const.js');
var db = require(C.DB);
var testdata = require(C.TESTDATA);
db.execute(testdata.insert);