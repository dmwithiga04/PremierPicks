import React from "react";
import "./styles/SearchResults.css";
//Component to handle and contain search results

export default function SearchResults(props) {
  {
    /* If there are search results, display them. else, display a message indicating that no results were found. */
  }
  if (props.searchResults.length > 0) {
    return (
      // Table to display search results
      <table>
        {/* Table headers */}
        <thead>
          <tr>
            <th>Title</th>
            <th>Rating</th>
            <th>Genre</th>
            <th>Certificate</th>
            <th>Year</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {props.searchResults.map((result, index) => (
            <tr key={index} className="results-tr">
              <td>{result.Title}</td>
              <td>{result.Rating}</td>
              <td>{result.Genre}</td>
              <td>{result.Certificate}</td>
              <td>{result.Year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } 
  else {
    return <p>No results found. Try a different search term!</p>;
  }
}
