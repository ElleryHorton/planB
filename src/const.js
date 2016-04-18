// const

module.exports = {

// libraries
CORE		: "../app/core.js",
DAL			: "../app/dal.js",
TESTDATA	: "../app/testdata.js",
TESTS		: "../app/tests.js",
PEOPLE		: "../app/people.js",
PLACES		: "../app/places.js",

NAME		: {
			PEOPLE	: "people"
},

// webserver config
ROUTE		: {
			ROOT		: "/",
			NEAR		: "/near",
			NEAR_PLACE	: "/near_place/:lat/:lng",
			NEAR_FILTER	: "/near_filter/:lat/:lng/:dst/:lmt",
			ALL			: "/all",
			ADD			: "/add"
},
PORT		: {
			MAIN	: 8081
},

// locations
RALEIGH		: { name: "Raleigh", location: [35.7796, -78.6382] }

}