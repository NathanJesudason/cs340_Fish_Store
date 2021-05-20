  
//get an instance of mySQL
var mysql = require('mysql')

//create a connection pool using the provided credentials
var pool = mysql.createPool({
	connectionLimit : 10,
	host			: 'classmysql.engr.oregonstate.edu',
	user			: 'cs340_jesudasn',
	password		: '9714',
	database		: 'cs340_jesudasn',
  multipleStatements: true
})

//Export it for use in our application
module.exports.pool = pool;