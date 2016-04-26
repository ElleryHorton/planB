// assert test methods

var C = require("../const.js");

module.exports = {

equal : function (expected, actual, message) {
	if (expected == actual) {
		C.LOG.PASS(message);
	} else {
		C.LOG.FAIL(message + " (expected: " + expected + " actual: " + actual + ")");
	}
},

notEqual : function (expected, actual, message) {
	if (expected != actual) {
		C.LOG.PASS(message);
	} else {
		C.LOG.FAIL(message + " (values were equal: " + expected + ")");
	}
}

}