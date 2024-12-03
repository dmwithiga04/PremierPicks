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
    
    
    if (filters.genres.length > 0){
      //Create individual `LIKE` conditions for each genre, joined by `AND`.
      const genreConditions = filters.genres.map(() => `Genre LIKE ?`).join(" AND ");
      query += ` AND (${genreConditions})`;

      // Add each genre to the parameters array with `%` wildcards for partial matching.
      params.push(...filters.genres.map((genre) => `%${genre}%`)); 
    }
    // Add years filter
    if (filters.rated.length > 0) {
      const placeholders = filters.rated.map(() => "?").join(", "); // Create placeholders like ?, ?, ?
      query += ` AND Certificate IN (${placeholders})`;
      params.push(...filters.rated); // Spread the array into individual values for binding
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