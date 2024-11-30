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
function search(searchTerm, filters, callback) {
    let query = `
      SELECT * 
      FROM movies 
      WHERE Title LIKE ? 
    `;
    const params = [`%${searchTerm}%`];
    // Add genres filter only if there are valid genres
    if ( filters.genres.length > 0) {
        query += `  AND Genre LIKE ? `;
        params.push(filters.genres);
    }
    // Add years filter
    if (filters.rated.length > 0) {
        
        query += ` AND Certificate IN (?)`;
        params.push(filters.rated);
      }
    // Order results
    query += ` ORDER BY Rating DESC, Year DESC `;
  
    console.log("Executing query:", query);
    console.log("With parameters:", params);
  
    con.query(query, params, (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    });
  }

module.exports = { search };