import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

  const goList = () => {
    navigate("/movies");
  };

  if (loading) return <Loading />;

  const latestUnwatched = movies.filter((m) => !m.watched).slice(-5); // últimos 5 filmes pendentes
  const latestWatched = movies.filter((m) => m.watched).slice(-5); // últimos 5 filmes assistidos

  return (
    <div className="home-container">
      <section className="intro-section">
        <h1>Bem-vindo ao MeuFilme.io 🎬</h1>
        <p>
          Aqui você pode organizar sua experiência com filmes: cadastre títulos
          que já assistiu ou que deseja assistir, mantenha seu histórico sempre
          atualizado e nunca mais esqueça o que já viu ou o que está na sua
          lista de desejos.
        </p>
      </section>

      <section className="movies-section">
        <div className="section-header">
          <h2>Filmes para assistir</h2>
          <div className="actions">
            <button className="btn btn-primary" onClick={goCreateMovie}>
              Cadastrar novo filme
            </button>
            <button className="btn btn-primary" onClick={goList}>
              Lista de filmes
            </button>
          </div>
        </div>

        <div className="card-grid">
          {latestUnwatched.length > 0 ? (
            latestUnwatched.map((movie) => (
              <div className="card movie-card" key={movie.id}>
                <img
                  src={movie.poster_url || "https://via.placeholder.com/150"}
                  alt={`Capa de ${movie.title}`}
                  className="movie-img"
                />
                <h3>{movie.title}</h3>
                <p>{movie.synopsis.slice(0, 80)}...</p>
              </div>
            ))
          ) : (
            <p>Nenhum filme pendente para assistir.</p>
          )}
        </div>
      </section>

      <section className="movies-section">
        <h2>Histórico assistido</h2>
        <div className="card-grid">
          {latestWatched.length > 0 ? (
            latestWatched.map((movie) => (
              <div className="card movie-card" key={movie.id}>
                <img
                  src={movie.poster_url || "https://via.placeholder.com/150"}
                  alt={`Capa de ${movie.title}`}
                  className="movie-img"
                />
                <h3>{movie.title}</h3>
                <p>{movie.opinion?.slice(0, 80)}...</p>
              </div>
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
