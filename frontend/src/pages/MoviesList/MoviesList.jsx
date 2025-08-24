import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { getMovies, deleteMovie } from "../../services/movieService";
import "./MoviesList.css";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);

  const goCreateMovie = () => {
    Navigate("/movies/new");
  };

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
    <div className="movies-list-container">
      <div className="movies-list-header">
        <h1>Lista de Filmes</h1>
        <button className="btn" onClick={goCreateMovie}>
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
                  <td className="synopsis-col">{movie.synopsis}</td>
                  <td>
                    {movie.poster_url ? (
                      <img
                        src={movie.poster_url}
                        alt={movie.title}
                        className="poster-thumb"
                      />
                    ) : (
                      <span className="no-poster">-</span>
                    )}
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

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Tem certeza que deseja excluir este filme?</h3>
            <button onClick={handleDelete} className="btn btn-confirm">
              Confirmar
            </button>
            <button onClick={closeModal} className="btn btn-cancel">
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviesList;
