import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/movies/${id}`)
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => console.error(error));
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>Release Year: {movie.release_year}</p>
      <p>Genre: {movie.genre}</p>
      <p>{movie.synopsis}</p>
      <img src={movie.poster_url} alt={movie.title} />
    </div>
  );
};

export default MovieDetails;
