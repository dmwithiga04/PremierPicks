// Purpose: This file is used to query the database and return the results.
// TODO: Implement the query function to return the results of the query based on user input.
// TODO: Possibly have functions that have different queries for different purposes. 

// Import the mysql module
const mysql = require("mysql2");


// Create a connection to the database
const con = mysql.createConnection({
    host: "localhost", // Use "localhost" if Node.js is outside Docker
    port: 3306,
    user: "root",
    password: "premier-picks",
    database: "movieDB",
  });

// Query the database
con.connect(function (err) {
    con.query(
        "select  * from movies limit ?",
        [20],
        function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        }
    );
});