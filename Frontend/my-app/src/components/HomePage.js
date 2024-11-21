import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchResults from "./SearchResults"; // Correctly import the SearchResults component
import "./styles/HomePage.css";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  // Function to handle the actual search
  const fetchSearchResults = async (query) => {
    if (!query) {
      setSearchResults([]); // Clear results if query is empty
      return;
    }

    try {
      console.log(`Making request to http://localhost:4000/search?query=${query}`);
      const response = await axios.get(`http://localhost:4000/search?query=${query}`);
      console.log("Search results:", response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Function to handle changes in the search input
  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    // Debounce to limit requests
    if (debounceTimeout) {
      clearTimeout(debounceTimeout); // Clear the previous timeout
    }

    const timeout = setTimeout(() => {
      fetchSearchResults(newSearchTerm);
    }, 150);
    
    setDebounceTimeout(timeout);
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
        {/* The input below triggers a real-time search */}
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="lname">Search Movie: </label>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search..."
          />
        </form>

        {/* Display search results */}
        <SearchResults searchResults={searchResults} />
      </main>
    </div>
  );
};

export default HomePage;
