const mysql = require('mysql2');

const con = mysql.createConnection({
  host: "localhost", // Use "localhost" if Node.js is outside Docker
  port: 3306,
  user: "root",
  password: "premier-picks",
  database: "movieDB",
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
