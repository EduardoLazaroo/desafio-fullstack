import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MovieForm = () => {
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [genre, setGenre] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const movieData = {
      title,
      release_year: releaseYear,
      genre,
      synopsis,
      poster_url: posterUrl,
    };

    axios.post("http://localhost:8000/api/movies", movieData)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Add Movie</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Release Year"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />
        <textarea
          placeholder="Synopsis"
          value={synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Poster URL"
          value={posterUrl}
          onChange={(e) => setPosterUrl(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default MovieForm;
