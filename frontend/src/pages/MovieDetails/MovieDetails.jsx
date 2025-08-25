import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../services/movieService";
import Loading from "../../assets/Loading";
import "../MovieDetails/MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieById(id);
        setMovie(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
        setError("Não foi possível carregar os detalhes do filme. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <div className="error-message">{error}</div>;

  const { poster_url, title, release_year, genre, synopsis } = movie;

  return (
    <div className="movie-details-container">
      <div className="card movie-details-card">
        <img
          src={poster_url || "default-poster.jpg"}
          alt={title}
          className="movie-poster"
        />
        <div className="movie-info">
          <h1>{title}</h1>
          <p>
            <strong>Ano:</strong> {release_year}
          </p>
          <p>
            <strong>Gênero:</strong> {genre}
          </p>
          <p>{synopsis}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
