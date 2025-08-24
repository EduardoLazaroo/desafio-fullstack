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

  if (!movie) return <div className="loading">Carregando...</div>;

  return (
    <div className="movie-details-container">
      <div className="card movie-details-card">
        <img
          src={movie.poster_url}
          alt={movie.title}
          className="movie-poster"
        />
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <p>
            <strong>Ano:</strong> {movie.release_year}
          </p>
          <p>
            <strong>Gênero:</strong> {movie.genre}
          </p>
          <p>{movie.synopsis}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
