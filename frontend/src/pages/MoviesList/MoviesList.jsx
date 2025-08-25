import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMovies, deleteMovie } from "../../services/movieService";
import Loading from "../../assets/Loading";
import "./MoviesList.css";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);

  const navigate = useNavigate();

  const openModal = (movie) => {
    setMovieToDelete(movie);
    setShowModal(true);
  };

  const closeModal = () => {
    setMovieToDelete(null);
    setShowModal(false);
  };

  const handleDelete = async () => {
    if (!movieToDelete) return;

    try {
      await deleteMovie(movieToDelete.id);
      setMovies((prevMovies) =>
        prevMovies.filter((movie) => movie.id !== movieToDelete.id)
      );
      closeModal();
    } catch (error) {
      console.error("Erro ao excluir o filme:", error);
    }
  };

  const handleCreateMovie = () => {
    navigate("/movies/new");
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data = await getMovies();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies list:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) return <Loading />;

  const MoviePoster = ({ url, title }) =>
    url ? (
      <img src={url} alt={title} className="poster-thumb" />
    ) : (
      <span className="no-poster">-</span>
    );

  return (
    <div className="movies-list-container">
      <div className="movies-list-header">
        <h1>Lista de Filmes</h1>
        <button className="btn" onClick={handleCreateMovie}>
          Cadastrar novo filme
        </button>
      </div>
      <div className="table-wrapper">
        <table className="movies-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Ano</th>
              <th>Gênero</th>
              <th>Data</th>
              <th>Sinopse</th>
              <th>Poster</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {movies.length > 0 ? (
              movies.map((movie) => (
                <tr key={movie.id}>
                  <td>
                    <Link to={`/movie/${movie.id}`} className="btn-link">
                      {movie.title}
                    </Link>
                  </td>
                  <td>{movie.release_year}</td>
                  <td>{movie.genre}</td>
                  <td>{new Date(movie.created_at).toLocaleDateString()}</td>
                  <td className="synopsis-col">{movie.synopsis}</td>
                  <td>
                    <MoviePoster url={movie.poster_url} title={movie.title} />
                  </td>
                  <td className="actions-col">
                    <button className="btn btn-edit">
                      <Link to={`/movies/${movie.id}/edit`}>Editar</Link>
                    </button>

                    <button
                      className="btn btn-delete"
                      onClick={() => openModal(movie)}
                    >
                      Excluir
                    </button>
                    <button className="btn btn-view">
                      <Link to={`/movies/${movie.id}`}>Ver</Link>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  Nenhum filme encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && movieToDelete && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Excluir Filme</h3>
            <p>
              Tem certeza que deseja excluir o filme{" "}
              <strong>"{movieToDelete.title}"</strong>?
            </p>
            <div className="modal-actions">
              <button onClick={handleDelete} className="btn btn-confirm">
                Confirmar
              </button>
              <button onClick={closeModal} className="btn btn-delete">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviesList;
