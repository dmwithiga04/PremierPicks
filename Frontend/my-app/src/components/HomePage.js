// This file contains the code for the homepage of the app.
import React, { useState } from "react";
import axios from "axios";
import "./HomePage.css";

const HomePage = () => {
  // State variables
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Function to handle search form submission
  const handleSearch = async (event) => {
    event.preventDefault();
    setErrorMessage(""); // Reset error message

    // Make a request to the backend to search for movies
    try {
      console.log(
        `Making request to http://localhost:4000/search?query=${searchTerm}`
      );
      const response = await axios.get(
        `http://localhost:4000/search?query=${searchTerm}`
      );
      console.log("Search results:", response.data); // Debugging log
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setErrorMessage("Failed to fetch search results. Please try again.");
    }
  };

  return (
    <div>
      <header>
        <img src="/THE_CLAPPER.png" alt="the clapper" />
        <h1>Premier Picks v1</h1>
      </header>
      <main>
        <p>
          This is just a test homepage to get a hang of React! c: <br />
        </p>
        {/*The form below is used to search for movies*/}
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
          />
          <button type="submit">Search</button>
        </form>
        {/*Display search results*/}
        <div>
          {/*If there are search results, display them in a list*/}
          {searchResults.length > 0 ? (
            searchResults.map((result, index) => (
              // Display the title and year of each movie
              <p key={index}>
                {result.Title} : {result.Year}
              </p> 
            ))
          ) : (
            <p>No results found. Try a different search term!</p>
          )}
        </div>
        {errorMessage && <p>{errorMessage}</p>}
      </main>
    </div>
  );
};

export default HomePage;
