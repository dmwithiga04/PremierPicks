// Initiate the server and listen to the port 4000

const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');

const con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "premier-picks",
  database: "movieDB",
});

const app = express();

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

app.get('/search', function(req, res) {
  const searchTerm = req.query.search;
  console.log('Received search term:', searchTerm);

  // Process the search data as needed
  con.query(
    "SELECT * FROM movies WHERE Title LIKE ?",
    [`%${searchTerm}%`],
    function (err, result, fields) {
      if (err) throw err;
      res.json(result);
    }
  );
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});