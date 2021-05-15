  
//get an instance of mySQL
var mysql = require('mysql')

//create a connection pool using the provided credentials
var pool = mysql.createPool({
	connectionLimit : 10,
	host			: 'classmysql.engr.oregonstate.edu',
	user			: 'cs340_chenmich',
	password		: '4019',
	database		: 'cs340_chenmich'
})

//Export it for use in our application
module.exports.pool = pool;