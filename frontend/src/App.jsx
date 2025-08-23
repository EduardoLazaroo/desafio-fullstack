import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import "./App.css";

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route path="/home" element={<HomePage />} />
          <Route path="/movies/new" element={<MovieForm />} />
          <Route path="/movies/:id" element={<MovieDetails />} /> */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
