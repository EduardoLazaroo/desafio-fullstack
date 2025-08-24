import { useNavigate } from "react-router-dom";
import "../HomePage/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  const goCreateMovie = () => {
    navigate("/movies/new");
  };

  const goList = () => {
    navigate("/movies");
  };

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
          <div className="card movie-card">
            <img
              src="https://via.placeholder.com/150"
              alt="Capa do filme"
              className="movie-img"
            />
            <h3>Título do Filme</h3>
            <p>Uma breve descrição do filme para despertar interesse.</p>
          </div>

          <div className="card movie-card">
            <img
              src="https://via.placeholder.com/150"
              alt="Capa do filme"
              className="movie-img"
            />
            <h3>Outro Filme</h3>
            <p>Mais um filme interessante que você pode assistir em breve.</p>
          </div>
        </div>
      </section>

      <section className="movies-section">
        <h2>Histórico assistido</h2>
        <div className="card-grid">
          <div className="card movie-card">
            <img
              src="https://via.placeholder.com/150"
              alt="Capa do filme"
              className="movie-img"
            />
            <h3>Filme já assistido</h3>
            <p>Você marcou este filme como assistido.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
