import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://127.0.0.1:5000/search",
        { data: { query: searchQuery } },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => setResults(response.data))
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Search:
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
