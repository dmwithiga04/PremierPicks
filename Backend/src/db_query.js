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

// Connect to the database
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to the database!");
});

// Query the database
function search(searchTerm, callback) {
    con.query(
        "SELECT * FROM movies WHERE Title LIKE ? LIMIT 10",
        [`%${searchTerm}%`],
        function (err, result, fields) {
            if (err) return callback(err, null);
            callback(null, result);
        }
    );
}

module.exports = { search };