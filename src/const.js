// const

module.exports = {

// libraries
ASSERT  : "../app/assert.js",
CORE	: "../app/core.js",
DAL		: "../app/dal.js",
TESTDATA: "../app/testdata.js",
TESTS	: "../app/tests.js",
PEOPLE	: "../app/people.js",
PLACES	: "../app/places.js",

NAME	: {
			PEOPLE	: "people"
},

// webserver config
ROUTE	: {
			ROOT		: "/",
			NEAR		: "/near",
			NEAR_PLACE	: "/near_place/:lat/:lng",
			NEAR_FILTER	: "/near_filter/:lat/:lng/:dst/:lmt",
			ALL			: "/all",
			ADD			: "/add"
},
PORT	: {
			MAIN	: 8081
},

// locations
RALEIGH	: { name: "Raleigh", location: [35.7796, -78.6382] },

LatLng : {
	lat : function() { return module.exports.RALEIGH.location[0]; },
	lng : function() { return module.exports.RALEIGH.location[1]; }
},

// defaults and limits
DEFAULT	: {
            DISTANCE    : 1,
            LIMIT		: 10
},
MAX		: {
            DISTANCE    : 5,
            LIMIT		: 10
},
MIN		: {
            DISTANCE    : 0,
            LIMIT		: 0
},

// messaging
LOG		: {
            LOW         : function (msg) { console.log("%s%s%s", ICON_COL, STATUS_COL, msg) },
            FAIL        : function (msg) { console.log("\x1b[31m%s%s%s\x1b[0m", "X ", "failed: ", msg) },
            PASS        : function (msg) { console.log("\x1b[32m%s%s%s\x1b[0m", "✓ ", "passed: ", msg) },
            ERR         : function (msg) { console.log("\x1b[5m\x1b[31m%s%s%s\x1b[0m", "! ", "error:  ", msg) }
},

NOT_OK  :   "{\"ok\":false}"

}

var ICON_COL = "  ";
var STATUS_COL = "        ";