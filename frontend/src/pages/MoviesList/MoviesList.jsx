import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../../services/movieService";
import "../MoviesList/MoviesList.css";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies list:", error);
      }
    };
    fetchMovies();
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
