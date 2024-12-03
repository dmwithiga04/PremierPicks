import React from "react";
import { useLocation } from "react-router-dom";

{/* This component displays the movie profile page. It receives the movie data from the database and api*/}
export default function MovieProfiles() {
  // Get the current location object (results from the search)
  const location = useLocation();
  // Extract the movie data from paramerter passed in the link
  const { dbData } = location.state || {}; // Access the passed state

  {/* If there is no movie data, display a message indicating that no movie data is available. 
    Mainly for debuging code*/}
  if (!dbData) {
    return <p>No movie data available.</p>;
  }

  {/* Display the movie data */}
  return (
    <div>
      <h1>{dbData.Title}</h1>
      <p>Rating: {dbData.Rating}</p>
      <p>Genre: {dbData.Genre}</p>
      <p>Certificate: {dbData.Certificate}</p>
      <p>Year: {dbData.Year}</p>
      <p>Stars: {dbData.Stars}</p>
    </div>
  );
}