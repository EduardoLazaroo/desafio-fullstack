import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getLatestUnwatchedMovies,
  getLatestWatchedMovies,
} from "../../services/movieService";
import Loading from "../../assets/Loading";
import "../HomePage/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [latestUnwatched, setLatestUnwatched] = useState([]);
  const [latestWatched, setLatestWatched] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true); // começa o loading
      try {
        const unwatched = await getLatestUnwatchedMovies();
        const watched = await getLatestWatchedMovies();
        setLatestUnwatched(unwatched);
        setLatestWatched(watched);
      } catch (error) {
        console.error("Erro ao carregar filmes da Home:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const goCreateMovie = () => {
    navigate("/movies/new");
  };

  const goList = () => {
    navigate("/movies");
  };

  if (loading) return <Loading />;

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
                <p>{movie.opinion.slice(0, 80)}...</p>
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
