import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function MovieProfiles() {
  const location = useLocation();
  const { dbData } = location.state || {}; // Access the passed state

  const [movieData, setMovieData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (dbData) {
      const fetchMovieData = async () => {
        try {
          const url = `http://img.omdbapi.com/?t=${dbData.Title}&y=${dbData.Year}&plot=full&apikey=3fb94e96`;
          console.log(`Making request to: ${url}`);
          const response = await axios.get(url);
          console.log("API response:", response.data);
          setMovieData(response.data);
        } catch (error) {
          console.error("Error fetching movie data:", error);
          setError("Failed to fetch movie data. Please try again.");
        }
      };

      fetchMovieData();
    }
  }, [dbData]);

  if (!dbData) {
    return <p>No movie data available.</p>;
  }

  return (
    <div>
      <h1>{dbData.Title}</h1>
      <p>Rating: {dbData.Rating}</p>
      <p>Genre: {dbData.Genre}</p>
      <p>Certificate: {dbData.Certificate}</p>
      <p>Year: {dbData.Year}</p>
      <p>Stars: {dbData.Stars}</p>
      {error && <p>{error}</p>}
      {movieData && (
        <div>
          <h2>Additional Movie Data from API</h2>
          <p>Plot: {movieData.Plot}</p>
          <p>Director: {movieData.Director}</p>
          <p>Actors: {movieData.Actors}</p>
          {/* Add more fields as needed */}
        </div>
      )}
    </div>
  );
}