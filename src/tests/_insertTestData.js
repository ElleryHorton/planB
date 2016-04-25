// insert test data
var C = require('../const.js');
var DAL = require(C.DAL);
var testdata = require(C.TESTDATA);
DAL.execute(testdata.insert);