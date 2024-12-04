// Initiate the server and listen to the port 4000

const mysql = require("mysql2");
const { search } = require("./db_query"); // Import the search function from db_query.js
const express = require("express");
const cors = require("cors"); // Import the cors package
const bodyParser = require("body-parser");
const fs = require("fs"); // Import the fs module
const path = require("path"); // Import the path module

const app = express();
app.use(cors()); // Use the cors middleware
// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Endpoint to access the API keys
app.get('/api/keys', (req, res) => {
  const omdbKeyPath = path.join(__dirname, 'apikeys', 'OMDBapikey.txt');
  const rapidApiKeyPath = path.join(__dirname, 'apikeys', 'Rapidapikey.txt');

  const omdbApiKey = fs.readFileSync(omdbKeyPath, 'utf8').trim();
  const rapidApiKey = fs.readFileSync(rapidApiKeyPath, 'utf8').trim();

  res.json({
    omdbApiKey,
    rapidApiKey
  });
});

// Endpoint to search for movies
app.get("/search", (req, res) => {
  const searchTerm = req.query.query;

  // Extract the genres and rated filters from the query parameters
  const filters = {
    // Check if `req.query.genres` is an array
    genres: Array.isArray(req.query.genres)
        ? req.query.genres // If true, use that array
        : req.query.genres?.split(',') || [], // Else, create an array that contains the genres 
    rated: Array.isArray(req.query.rated)
        ? req.query.rated
        : req.query.rated?.split(',') || [], 
};
  console.log("Received search term:", searchTerm);
  console.log("Filters:", filters);
  console.log()
  // Check if the search term is empty
  if (!searchTerm) {
    res.status(400).send("Search term is required");
    return;
  }

  // Call the search function with the search term and filters as parameters
  search(searchTerm, filters, (err, result) => {
    if (err) {
      res.status(500).send("Error querying the database");
      return;
    }
    res.send(result);
  });
});
// Start the server
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});

