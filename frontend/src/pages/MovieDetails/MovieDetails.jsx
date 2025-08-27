import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMovieById } from "../../services/movieService";
import { fetchMovies } from "../../redux/slices/moviesSlice";
import Loading from "../../assets/Loading";
import "../MovieDetails/MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.movies.list);
  const globalLoading = useSelector((state) => state.movies.loading);

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const movieFromState = movies.find((m) => m.id === Number(id));
    if (movieFromState) {
      setMovie(movieFromState);
      setLoading(false);
    } else {
      const fetchMovie = async () => {
        setLoading(true);
        try {
          const data = await getMovieById(id);
          setMovie(data);
          dispatch(fetchMovies());
        } catch (err) {
          console.error("Erro ao buscar detalhes do filme:", err);
          setError(
            "Não foi possível carregar os detalhes do filme. Tente novamente mais tarde."
          );
        } finally {
          setLoading(false);
        }
      };
      fetchMovie();
    }
  }, [id, movies, dispatch]);

  if (loading || globalLoading) return <Loading />;
  if (error) return <div className="error-message">{error}</div>;
  if (!movie) return <div className="error-message">Filme não encontrado.</div>;

  const { poster_url, title, release_year, genre, synopsis, opinion, watched } =
    movie;

  const hasWatched = watched === 1 || watched === true;

  return (
    <div className="movie-details-container">
      <div className="card movie-details-card">
        <img
          src={poster_url || "https://via.placeholder.com/300x450"}
          alt={title}
          className="movie-poster"
        />
        <div className="movie-info">
          <h1>{title}</h1>

          <div className="movie-field">
            <strong>Ano</strong>
            <span>{release_year || "Sem informação"}</span>
          </div>

          <div className="movie-field">
            <strong>Gênero</strong>
            <span>{genre || "Sem informação"}</span>
          </div>

          <div className="movie-field">
            <strong>Sinopse</strong>
            <span>{synopsis || "Sem sinopse disponível"}</span>
          </div>

          <div className="movie-field">
            <strong>Opinião</strong>
            <span>
              {hasWatched
                ? opinion || "Sem opinião registrada"
                : "Não assistido ainda"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
