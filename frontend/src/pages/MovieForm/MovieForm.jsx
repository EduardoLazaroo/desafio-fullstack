import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addMovie, getMovieById, updateMovie } from "../../services/movieService";
import "./MovieForm.css";

const MovieForm = () => {
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [genre, setGenre] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [posterUrl, setPosterUrl] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      const fetchMovie = async () => {
        try {
          const data = await getMovieById(id);
          setTitle(data.title);
          setReleaseYear(data.release_year);
          setGenre(data.genre);
          setSynopsis(data.synopsis);
          setPosterUrl(data.poster_url || "");
        } catch (error) {
          console.error("Erro ao carregar filme:", error);
        }
      };
      fetchMovie();
    }
  }, [id, isEditMode]);

  const isValidUrl = (string) => {
    if (!string) return true;
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidUrl(posterUrl)) {
      alert("Poster URL inválida!");
      return;
    }

    if (!title.trim() || !genre.trim() || !synopsis.trim()) {
      alert("Título, gênero e sinopse são obrigatórios!");
      return;
    }

    const year = Number(releaseYear);
    const currentYear = new Date().getFullYear();
    if (!Number.isInteger(year) || year < 1800 || year > currentYear) {
      alert(`Ano de lançamento deve ser entre 1800 e ${currentYear}`);
      return;
    }

    const movieData = {
      title: title.trim(),
      release_year: year,
      genre: genre.trim(),
      synopsis: synopsis.trim(),
      poster_url: posterUrl.trim() === "" ? null : posterUrl.trim(),
    };

    try {
      if (isEditMode) {
        await updateMovie(id, movieData);
        alert("Filme atualizado com sucesso!");
      } else {
        await addMovie(movieData);
        alert("Filme cadastrado com sucesso!");
      }
      navigate("/movies");
    } catch (error) {
      console.error("Erro ao salvar filme:", error.response?.data || error.message);
      alert("Erro ao salvar filme. Verifique os dados e tente novamente.");
    }
  };

  return (
    <div className="movie-form-container">
      <div className="movie-form-card">
        <h1 className="form-title">{isEditMode ? "Editar Filme" : "Adicionar Filme"}</h1>
        <form onSubmit={handleSubmit} className="movie-form">
          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="releaseYear">Ano de lançamento</label>
            <input
              id="releaseYear"
              type="number"
              value={releaseYear}
              onChange={(e) => setReleaseYear(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="genre">Gênero</label>
            <input
              id="genre"
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="synopsis">Sinopse</label>
            <textarea
              id="synopsis"
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="posterUrl">URL do poster (opcional)</label>
            <input
              id="posterUrl"
              type="url"
              value={posterUrl}
              onChange={(e) => setPosterUrl(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-primary">
            {isEditMode ? "Atualizar" : "Salvar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;
