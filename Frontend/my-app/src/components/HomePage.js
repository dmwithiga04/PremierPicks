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
      fetchSearchResults(newSearchTerm);
    }, 150);
    
    setDebounceTimeout(timeout);
  };
  const toggleFilterBox = () => {
    setIsFilterBoxVisible((prevState) => !prevState);
  };

  // Handle checkbox changes
  const handleCheckboxChange = (filterType, value) => {
    setFilters((prevFilters) => {
      const currentValues = prevFilters[filterType];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value) 
        : [...currentValues, value]; 
      return { ...prevFilters, [filterType]: updatedValues };
    });
  };

  // Apply filters
  const applyFilters = () => {
    fetchSearchResults(searchTerm, filters);
    setIsFilterBoxVisible(false); 
  };

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
                  onChange={() => handleCheckboxChange("rated", rated)}
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
                  onChange={() => handleCheckboxChange("genres", genre)}
                />
                {genre}
              </label>
            ))}
          </div>
          {/* Apply Filters Button */}
          <button className="applyFilterbtt" onClick={applyFilters}>
            Filter
          </button>
        </div>
        )}

        {/* Display search results */}
        <SearchResults searchResults={searchResults} />
      </main>
    </div>
  );
};

export default HomePage;
