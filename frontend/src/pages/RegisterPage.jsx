import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import "../App.css";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      const response = await registerUser(
        name,
        email,
        password,
        confirmPassword
      );
      localStorage.setItem("token", response.token);
      navigate("/home");
    } catch (error) {
      console.error(error);
      if (error.errors) {
        const errors = Object.values(error.errors).flat().join("\n");
        alert(errors);
      } else {
        alert("Erro ao registrar. Tente novamente.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="card">
        <h2>Crie sua conta</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn">
            Criar Conta
          </button>
        </form>

        <div className="login-link">
          <p>
            Já tem uma conta? <a href="/login">Entre aqui</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
