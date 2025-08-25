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
    // Primeiro tenta pegar o filme do estado global
    const movieFromState = movies.find((m) => m.id === Number(id));
    if (movieFromState) {
      setMovie(movieFromState);
      setLoading(false);
    } else {
      // Se não estiver, busca do serviço
      const fetchMovie = async () => {
        setLoading(true);
        try {
          const data = await getMovieById(id);
          setMovie(data);
          // Atualiza o estado global para consistência
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
          <p>
            <strong>Ano:</strong> {release_year}
          </p>
          <p>
            <strong>Gênero:</strong> {genre}
          </p>
          <p>{synopsis}</p>
          {watched && opinion && (
            <p>
              <strong>Opinião:</strong> {opinion}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
