import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import "../App.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(email, password);
      localStorage.setItem("token", response.token);
      navigate("/home");
    } catch (error) {
      console.error(error);
      alert("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  const goRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <div className="card">
        <h2>Entre com seu login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn">
            Entrar
          </button>
        </form>

        <div className="register-link">
          <p>
            Ainda não tem uma conta? <a onClick={goRegister}>Crie sua conta</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
