import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './components/HomePage';
import MovieProfiles from './components/MovieProfile';

function App() {
  return (
    // Router to handle routing between pages
    // Routes to define the routes for the application
    <Router>
      <Routes>
        // Route to the home page
        <Route path="/" element={<HomePage />} />
        // Route to the movie profile page
        <Route path="/movie-profile" element={<MovieProfiles />} />
      </Routes>
    </Router>
  );
}

export default App;
