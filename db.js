const mysql = require('mysql2/promise')

const mysqlPool = mysql.createPool({
	host: 'localhost',
  	user: 'root',
  	password: 'program135',
  	database: 'program'
})

module.exports = mysqlPool
