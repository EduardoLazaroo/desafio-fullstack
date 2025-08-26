import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addMovie,
  getMovieById,
  updateMovie,
} from "../../services/movieService";
import { fetchMovies } from "../../redux/slices/moviesSlice";
import Loading from "../../assets/Loading";
import "./MovieForm.css";

const MovieForm = () => {
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [genre, setGenre] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [watched, setWatched] = useState(false);
  const [opinion, setOpinion] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      const fetchMovie = async () => {
        setLoading(true);
        try {
          const data = await getMovieById(id);
          setTitle(data.title);
          setReleaseYear(data.release_year);
          setGenre(data.genre);
          setSynopsis(data.synopsis);
          setPosterUrl(data.poster_url || "");
          setWatched(data.watched || false);
          setOpinion(data.opinion || "");
        } catch (error) {
          console.error("Erro ao carregar filme:", error);
          alert("Erro ao carregar filme. Tente novamente.");
        } finally {
          setLoading(false);
        }
      };
      fetchMovie();
    }
  }, [id, isEditMode]);

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Preencha corretamente o título";
    if (!releaseYear.trim()) newErrors.releaseYear = "Preencha corretamente a data";
    if (!genre.trim()) newErrors.genre = "Preencha corretamente o gênero";
    if (!synopsis.trim()) newErrors.synopsis = "Preencha corretamente a sinopse";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const movieData = {
      title: title.trim(),
      release_year: releaseYear,
      genre: genre.trim(),
      synopsis: synopsis.trim(),
      poster_url: posterUrl.trim() || null,
      watched,
      opinion: watched ? opinion.trim() : null,
    };

    try {
      setLoading(true);
      if (isEditMode) {
        await updateMovie(id, movieData);
      } else {
        await addMovie(movieData);
      }
      dispatch(fetchMovies());
      navigate("/movies");
    } catch (error) {
      console.error("Erro ao salvar filme:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="movie-form-container">
      <div className="movie-form-card">
        <h1 className="form-title">
          {isEditMode ? "Editar Filme" : "Adicionar Filme"}
        </h1>
        <form onSubmit={handleSubmit} className="movie-form">
          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input
              id="title"
              type="text"
              placeholder="Digite o título do filme"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <span className="error">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="releaseYear">Data de Lançamento</label>
            <input
              id="releaseYear"
              type="date"
              value={releaseYear}
              onChange={(e) => setReleaseYear(e.target.value)}
            />
            {errors.releaseYear && <span className="error">{errors.releaseYear}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="genre">Gênero</label>
            <input
              id="genre"
              type="text"
              placeholder="Ex: Ação, Comédia, Drama"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
            {errors.genre && <span className="error">{errors.genre}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="synopsis">Sinopse</label>
            <textarea
              id="synopsis"
              placeholder="Escreva a sinopse do filme"
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
            />
            {errors.synopsis && <span className="error">{errors.synopsis}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="posterUrl">URL do Poster (opcional)</label>
            <input
              id="posterUrl"
              type="text"
              placeholder="https://exemplo.com/poster.jpg"
              value={posterUrl}
              onChange={(e) => setPosterUrl(e.target.value)}
            />
          </div>

          <div className="form-group checkbox-group">
            <label className="custom-checkbox">
              <input
                type="checkbox"
                checked={watched}
                onChange={(e) => setWatched(e.target.checked)}
              />
              <span className="checkmark"></span>
              Já assisti
            </label>
          </div>

          {watched && (
            <div className="form-group">
              <label htmlFor="opinion">Opinião (opcional)</label>
              <textarea
                id="opinion"
                placeholder="Compartilhe sua opinião sobre o filme"
                value={opinion}
                onChange={(e) => setOpinion(e.target.value)}
              />
            </div>
          )}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Carregando..." : isEditMode ? "Atualizar" : "Salvar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;
