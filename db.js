const mysql = require("mysql2/promise");

function logSqlQuery(query) {
  console.log("Executing SQL query:", query);
}

const mysqlPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "program135",
  database: "program",
  queryFormat: function (query, values) {
    if (!values) return query;
    return query.replace(/\?/g, (match) => {
      if (values.length === 0) return match;
      return mysql.escape(values.shift());
    });
  },
  debug: logSqlQuery, // Set the custom logging function for queries
});

module.exports = mysqlPool;
