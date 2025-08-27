import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../redux/slices/moviesSlice";
import Loading from "../../assets/Loading";
import "../HomePage/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { list: movies, loading } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const goCreateMovie = () => {
    navigate("/movies/new");
  };

  if (loading) return <Loading />;

  const latestUnwatched = movies.filter((m) => !m.watched);
  const latestWatched = movies.filter((m) => m.watched);

  return (
    <div className="home-container">
      <section className="intro-section">
        <div className="intro-header">
          <h4>Bem-vindo ao</h4>
          <strong>meuFilme.io</strong>
        </div>
        <p>
          Organize sua lista de filmes de forma simples: adicione o que deseja
          assistir, marque os que já concluiu e registre suas impressões
          pessoais. Seu espaço individual para guardar tudo sobre sua
          experiência com o cinema.
        </p>
      </section>

      <section className="movies-section">
        <div className="section-header">
          <h3>Filmes para assistir</h3>
          <div className="actions">
            <button className="btn btn-primary" onClick={goCreateMovie}>
              Cadastrar novo filme
            </button>
          </div>
        </div>

        <div className="card-grid">
          {latestUnwatched.length > 0 ? (
            latestUnwatched.map((movie) => (
              <Link
                to={`/movies/${movie.id}`}
                key={movie.id}
                className="movie-link"
              >
                <div className="card movie-card">
                  <div className="header-card">
                    <div className="right-card">
                      <h3>{movie.title}</h3>
                      <p>{movie.genre}</p>
                    </div>
                  </div>
                  <img
                    src={movie.poster_url || "https://via.placeholder.com/150"}
                    alt={`Capa de ${movie.title}`}
                    className="movie-img"
                  />
                  <p className="strong">Sinopse:</p>
                  <p>{movie.synopsis.slice(0, 80)}...</p>
                </div>
              </Link>
            ))
          ) : (
            <p>Nenhum filme pendente para assistir.</p>
          )}
        </div>
      </section>

      <section className="movies-section">
        <div className="section-header">
          <h3>Histórico assistido</h3>
        </div>

        <div className="card-grid">
          {latestWatched.length > 0 ? (
            latestWatched.map((movie) => (
              <Link
                to={`/movies/${movie.id}`}
                key={movie.id}
                className="movie-link"
              >
                <div className="card movie-card">
                  <div className="header-card">
                    <div className="right-card">
                      <h3>{movie.title}</h3>
                      <p>{movie.genre}</p>
                    </div>
                    <div className="badge-green">
                      <p>Visto!</p>
                    </div>
                  </div>
                  <img
                    src={movie.poster_url || "https://via.placeholder.com/150"}
                    alt={`Capa de ${movie.title}`}
                    className="movie-img"
                  />
                  {movie.opinion && (
                    <>
                      <p className="strong">Sua opinião:</p>
                      <p>{movie.opinion.slice(0, 80)}...</p>
                    </>
                  )}
                </div>
              </Link>
            ))
          ) : (
            <p>Você ainda não marcou nenhum filme como assistido.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
