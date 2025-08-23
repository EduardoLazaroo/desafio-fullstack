import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/movies")
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Movies List</h1>
      <Link to="/movie/create">Add Movie</Link>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesList;
