import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../services/movieService";
import "../MovieDetails/MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieById(id);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMovie();
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
