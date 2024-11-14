import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div>
      <header>
        <img src="/THE_CLAPPER.png" alt="the clapper" />
        <h1>Premier Picks v1</h1>
      </header>
      <main>
        <p>
          This is just a test homepage to get a hang of React! c: <br />
        </p>

        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="search">Search bar:</label>
          <input type="search" name="search" id="search" />
          <input type="submit" value="Submit" />
        </form>
      </main>
    </div>
  );
};

export default HomePage;