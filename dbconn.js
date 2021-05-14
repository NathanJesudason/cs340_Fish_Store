  //get an instance of mySQL
var mysql = require('mysql')

//create a connection pool using the provided credentials
var pool = mysql.createPool({
	connectionLimit : 10,
	host			: 'classmysql.engr.oregonstate.edu',
	user			: '',
	password		: '',
	database		: ''
})

//Export it for use in our application
module.exports.pool = pool;