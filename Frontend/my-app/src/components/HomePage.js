import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchResults from "./SearchResults"; // Correctly import the SearchResults component
import "./styles/HomePage.css";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const fetchSearchResults = async (query) => {
    if (!query) {
      setSearchResults([]);
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

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
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
        <h1 className="lacquer-regular">Premier Picks</h1>
      </header>
      <main>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            className="search-bar"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search movie..."
          />
        </form>
        <SearchResults searchResults={searchResults} />
      </main>
    </div>
  );
};
export default HomePage;
