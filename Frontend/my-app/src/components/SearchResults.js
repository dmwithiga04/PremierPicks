import React from "react";
import {Link} from "react-router-dom";
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
        {/* Table body with table data */}
        <tbody>
          {props.searchResults.map((result, index) => (
            // movie title which is a link to the movie's profile page
            <tr key={index} className="results-tr">
              <td><Link to={`/movie-profile`} state={{ dbData: result }}>
                  {result.Title}
                </Link></td>
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
