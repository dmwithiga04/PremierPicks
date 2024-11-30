// Initiate the server and listen to the port 4000

const mysql = require("mysql2");
const { search } = require("./db_query"); // Import the search function from db_query.js
const express = require("express");
const cors = require("cors"); // Import the cors package
const bodyParser = require("body-parser");

const app = express();
app.use(cors()); // Use the cors middleware
// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

app.get("/search", (req, res) => {
  const searchTerm = req.query.query;
  const filters = {
    rated: req.query.rated || "",
    genres: req.query.genres || "", // Default to empty if not provided
  };
  console.log("Received search term:", searchTerm);
  console.log("Filters:", filters);
  console.log()
  if (!searchTerm) {
    res.status(400).send("Search term is required");
    return;
  }

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

// Initiate the server and listen to the port 4000

// const mysql = require("mysql2");
// const { search } = require("./db_query"); // Import the search function from db_query.js
// const express = require("express");
// const cors = require("cors"); // Import the cors package
// const bodyParser = require("body-parser");

// const app = express();
// app.use(cors()); // Use the cors middleware
// // Use body-parser middleware to parse JSON request bodies
// app.use(bodyParser.json());

// app.get("/search", (req, res) => {
//   const searchTerm = req.query.query; // Ensure this matches the query parameter name
//   const filters = {
//         genres: req.query.genres || "", // Default to empty if not provided
//         years: req.query.years || "",
//         ratings: req.query.ratings || "",
//       };
//   console.log("Received search term:", searchTerm);

//   // Check if the search term is empty
//   if (!searchTerm) {
//     res.status(400).send("Search term is required");
//     return;
//   }

//   // Call the search function from db_query.js
//   search(searchTerm, filters, (err, result) => {
//         if (err) {
//           res.status(500).send("Error querying the database");
//           return;
//         }
//         res.send(result);
//       });
//     });
//     // Start the server
//     app.listen(4000, () => {
//       console.log("Server is running on port 4000");
//     });
    
 
