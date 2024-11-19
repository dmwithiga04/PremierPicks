// This file contains the code for the homepage of the app.
import React, { useState } from "react";
import axios from "axios";
import SearchResults from "./SearchResults"; // Correctly import the SearchResults component
import "./styles/HomePage.css";

const HomePage = () => {
  // State variables
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Function to handle search form submission
  const handleSearch = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
    setSearchResults([]); // Clear previous search results

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
    }
  };

  return (
    <div>
      <header>
        <img src="/THE_CLAPPER.png" alt="the clapper" />
        <h1>Premier Picks</h1>
      </header>
      <main>
        <p>
          The "good movie" database!<br />
        </p>
        {/* The form below is used to search for movies */}
        <form onSubmit={handleSearch}>
        <label for="lname">Search Movie: </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
          />
          <button type="Search">Search</button>
        </form>

        {/* Display search results */}
        <SearchResults searchResults={searchResults} />
      </main>
    </div>
  );
};

export default HomePage;
