import React, { useEffect, useState } from "react";//
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

//Component to handle and display movie profiles
//This component fetches additional movie data from the OMDB API and streaming data from the RapidAPI
//It also displays the movie details and streaming availability
export default function MovieProfiles() {
  const location = useLocation();//use the useLocation hook to access the location object
  const { dbData } = location.state || {}; // Access the passed state and dbData object passed through SearchResults.js

  const [movieData, setMovieData] = useState(null); //store movie data from the OMDB API
  const [streamingData, setStreamingData] = useState(null); //store streaming data from the RapidAPI
  const [error, setError] = useState(null); //store error messages

  const [apiKeys, setApiKeys] = useState({ omdbApiKey: "", rapidApiKey: "" }); //store API keys

  // Fetch API keys from the backend and store them in a variable
  useEffect(() => {
    const fetchApiKeys = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/keys");
        setApiKeys(response.data);
      } catch (error) {
        console.error("Error fetching API keys:", error);
        setError("Failed to fetch API keys. Please try again.");
      }
    };

    fetchApiKeys();
  }, []);

  // Fetch movie data from OMDB and streaming data from RapidAPI
  useEffect(() => {
    //check if dbData and API keys are available before making the API calls
    if (dbData && apiKeys.omdbApiKey && apiKeys.rapidApiKey) {
      const fetchMovieData = async () => {
        // Make a request to the OMDB API to get additional movie data
        try {
          const url = `http://www.omdbapi.com/?apikey=${
            apiKeys.omdbApiKey
          }&t=${encodeURIComponent(dbData.Title)}&y=${dbData.Year}&plot=full`;
          console.log(`Making request to: ${url}`);
          const response = await axios.get(url);
          console.log("API response:", response.data);

          // Check if the response is successful
          if (response.data.Response === "True") {
            setMovieData(response.data);
          } else {
            setError(response.data.Error);
          }
        } catch (error) {
          console.error("Error fetching movie data:", error);
          setError("Failed to fetch movie data. Please try again.");
        }
      };

      // Make a request to the RapidAPI to get streaming data
      //Streaming Availability API responds with an array of movies, so we select the first movie in the array which is similar to the movie we are searching for
      const fetchStreamingData = async () => {
        // Set the options/params for the request
        const options = {
          method: "GET",
          url: "https://streaming-availability.p.rapidapi.com/shows/search/title",
          params: {
            country: "us",
            title: dbData.Title,
            series_granularity: "show",
            show_type: "movie",
            output_language: "en",
          },
          // Set the headers for the request
          headers: {
            "x-rapidapi-key": apiKeys.rapidApiKey,
            "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
          },
        };

        // Make a request to the RapidAPI to get streaming data
        try {
          const response = await axios.request(options);
          console.log("Streaming API response:", response.data);
          // Check if the response contains any data or not
          if (response.data.length > 0) {
            // Select the first movie in the array
            setStreamingData(response.data[0]); // Select the first movie in the array
          } else {
            setError("No streaming data available.");
          }
        } catch (error) {
          console.error("Error fetching streaming data:", error);
          setError("Failed to fetch streaming data. Please try again.");
        }
      };

      // Call the functions to fetch movie and streaming data
      fetchMovieData();
      fetchStreamingData();
    }
  }, [dbData, apiKeys]);

  if (!dbData) {
    return <p>No movie data available.</p>;
  }

  // List of streaming services to display to be used when processing the streaming data
  const specifiedStreamingSites = [
    "amazon",
    "disneyplus",
    "hbo",
    "hulu",
    "netflix",
    "apple",
    "max",
  ];

  return (
    <div>
      {/*Navigation to go back to the home page*/}
      <nav>
        <Link to="/">Go Home</Link>
      </nav>

      {/*Display the movie title*/}
      <h1>{dbData.Title}</h1>
      {/*Display the movie poster if available*/}
      {movieData && <img src={movieData.Poster} alt={movieData.Title} />}

      {/*Display the movie details from the*/}
      <p>
        <strong>Rating &#11088;:</strong> {dbData.Rating}
      </p>
      <p>
        <strong>Genre:</strong> {dbData.Genre}
      </p>
      <p>
        <strong>Certificate:</strong> {dbData.Certificate}
      </p>
      <p>
        <strong>Year:</strong> {dbData.Year}
      </p>
      <div></div>
      {/*Display the error message if there is an error*/}
      {error && <p>{error}</p>}

      {/*Display the additional movie data from the OMDB API*/}
      {movieData && (
        <div>
          <h2>Plot:</h2>
          <p>{movieData.Plot}</p>

          <h2>Director</h2>
          {/*Display the director as a link to Google search their bio*/}
          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(
              movieData.Director
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {movieData.Director}
          </a>

          <h3>Stars:</h3>
          {/*Display the stars as links to Google search their bio's in a list*/}
          <ul>
            {/*Map through the stars array and display them as links*/}
            {dbData.Stars.split(", ").map((star, index) => (
              <li>
                <a
                  key={index}
                  href={`https://www.google.com/search?q=${encodeURIComponent(
                    star
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {star}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {streamingData && (
        <div>
          <h2>Streaming Availability:</h2>
          {/*Display the streaming services where the movie is available*/}
          {(() => {
            {
              /*Create a set to store the rendered services*/
            }
            {
              /*used a set to avoid rendering the same service multiple times*/
            }
            const renderedServices = new Set();
            return streamingData.streamingOptions.us.map((option, index) => {
              let serviceName = "";
              if (option.link.includes("amazon")) {
                serviceName = "Amazon";
              } else if (option.link.includes("disneyplus")) {
                serviceName = "Disney+";
              } else if (option.link.includes("hbo")) {
                serviceName = "HBO";
              } else if (option.link.includes("hulu")) {
                serviceName = "Hulu";
              } else if (option.link.includes("netflix")) {
                serviceName = "Netflix";
              } else if (option.link.includes("apple")) {
                serviceName = "Apple TV";
              } else if (option.link.includes("max")) {
                serviceName = "Max";
              }

              {
                /*Check if the service is in the specified streaming sites and not already rendered*/
              }
              {
                /*using specifiedStreamingSites array to filter out unwanted services*/
              }
              if (
                !specifiedStreamingSites.includes(serviceName.toLowerCase()) ||
                renderedServices.has(serviceName)
              ) {
                return null;
              }

              {
                /*Add the service to the rendered services set*/
              }
              renderedServices.add(serviceName);

              return (
                <div key={index}>
                  <p>
                    <a
                      href={option.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={`/${serviceName}.png`}
                        width="40px"
                        height="40px"
                        alt={`${serviceName} logo`}
                      />
                    </a>
                  </p>
                </div>
              );
            });
          })()}
        </div>
      )}
    </div>
  );
}
