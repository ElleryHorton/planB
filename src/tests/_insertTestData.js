// insert test data
var C = require("../const.js");
var DAL = require("../app/dal.js");
var testdata = require("../app/testdata.js");
DAL.execute(testdata.insert);