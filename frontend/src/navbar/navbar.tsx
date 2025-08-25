import { useNavigate } from "react-router-dom";
import { logoutUser, isAuthenticated } from "../services/authService";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const userName = "Eduardo";

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  if (!isAuthenticated()) return null;

  return (
    <div>
      <nav className="navbar">
        <div className="right">
          <div className="navbar-brand">meuFilme.io</div>
          <div className="nav-links">
            <a href="/home">Home</a>
            <a href="/movies">Filmes</a>
          </div>
        </div>

        <div className="left">
          <span className="name-user">Bem vindo, {userName}</span>
          <button className="btn-logout" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
