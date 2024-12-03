import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchResults from "./SearchResults"; // Correctly import the SearchResults component

import "./styles/HomePage.css";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  // Function to handle the actual search
  const [filters, setFilters] = useState({
    genres: [],
    rated: [],
  });
  const [isFilterBoxVisible, setIsFilterBoxVisible] = useState(false);
  const fetchSearchResults = async (query, filter) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    try {
      const filterParams = new URLSearchParams();
    if (filters.genres.length > 0) {
      filterParams.append("genres", filters.genres.join(","));
    }
    if (filters.rated.length > 0) {
      filterParams.append("rated", filters.rated.join(","));
    }

    const url = `http://localhost:4000/search?query=${query}&${filterParams.toString()}`;
    console.log(`Making request to: ${url}`);
    const response = await axios.get(url);
    console.log("Search results with filters:", response.data);
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
      fetchSearchResults(newSearchTerm, filters);
    }, 150);
    
    setDebounceTimeout(timeout);
  };
  const toggleFilterBox = () => {
    setIsFilterBoxVisible((prevState) => !prevState);
  };

  // Handle checkbox changes
  const handleCheckboxChange = (filterType, value) => {
    setFilters((prevFilters) => {
      // Get the current values of the specified filter type (e.g., "genres" or "rated")
      const currentValues = prevFilters[filterType];
      
      // Determine the updated values:
      // - If the value is already selected, remove it (filter it out)
      // - Otherwise, add the value to the list (spread the existing values and append the new value)
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value) // Remove the value if it already exists
        : [...currentValues, value]; // Add the value if it doesn't exist

      // Return the updated filters object:
      // - Spread the previous filter state
      // - Update the specified filter type with the new values
      return { ...prevFilters, [filterType]: updatedValues };
    });
  };

  // Apply filters
  useEffect(() => {
    fetchSearchResults(searchTerm, filters);
  }, [filters]);

  return (
    <div>
      <header>
        <img src="/THE_CLAPPER.png" alt="the clapper" />
        <h1 className="lacquer-regular">Premier Picks</h1>
      </header>
      <main>
        <p className="vibur-regular">
          The "good movie" database!<br />
        </p>
        {/* The input below triggers a real-time search */}
        <div className="search-filter-container">
          <input
            type="text"
            className="search-bar"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search movie..."
          />
          <button className="filter-button" onClick={toggleFilterBox}>
            {isFilterBoxVisible ? "Filter" : "Filter"}
          </button>
          
        </div>

        {/* Filter box */}
        {isFilterBoxVisible && (
          <div className="filter-box">
          {/* Released Section */}
          <div className="releaseyear">
            <h7><strong>Rated</strong></h7>
            {["G", "PG", "PG-13", "R", "NC-17"].map((rated) => (
              <label key={rated}>
                <input
                  type="checkbox"
                  checked={filters.rated.includes(rated)}
                  // If the current rating is in `filters.rated`, the checkbox is checked
                  onChange={() => handleCheckboxChange("rated", rated)}
                  // Calls the handler to update the state when the checkbox is toggled                  
                />
                {rated}
              </label>
            ))}
          </div>
        
          {/* Genre Section */}
          <div className="genre">
            <h7><strong>Genre</strong></h7>
            {["Action", "Adventure" ,"Animation", "Biography", "Comedy" ,"Crime", "Drama", "Fantasy", "History", "Horror", "Mystery" ,"Music" ,"Romance",
              "Sci-Fi" ,"Sport" ,"Thriller" ,"War","Western"].map((genre) => (
              <label key={genre}>
                <input
                  type="checkbox"
                  checked={filters.genres.includes(genre)}
                  // If the current genre is in `filters.genres`, the checkbox is checked
                  onChange={() => handleCheckboxChange("genres", genre)}
                  // Calls the handler to update the state when the checkbox is toggled
                />
                {genre}
              </label>
            ))}
          </div>
          
        </div>
        )}

        {/* Display search results */}
        <SearchResults searchResults={searchResults} />
      </main>
    </div>
  );
};

export default HomePage;
