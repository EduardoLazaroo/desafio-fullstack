import { useNavigate } from "react-router-dom";
import { logoutUser, isAuthenticated } from "../services/authService";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  if (!isAuthenticated()) return null;

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">MeuFilme.io</div>
        <button className="btn-logout" onClick={handleLogout}>Sair</button>
      </nav>
    </div>
  );
};

export default Navbar;
