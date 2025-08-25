import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, removeMovie } from "../../redux/slices/moviesSlice";
import Loading from "../../assets/Loading";
import "./MoviesList.css";

const MoviesList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list: movies, loading } = useSelector((state) => state.movies);

  const [showModal, setShowModal] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);

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
      await dispatch(removeMovie(movieToDelete.id)).unwrap();
      closeModal();
    } catch (error) {
      console.error("Erro ao excluir o filme:", error);
    }
  };

  const handleCreateMovie = () => {
    navigate("/movies/new");
  };

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

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
                <td colSpan="7" className="no-data">
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
              <button onClick={closeModal} className="btn btn-cancel">
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
