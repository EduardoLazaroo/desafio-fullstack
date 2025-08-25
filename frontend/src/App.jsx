import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import MoviesList from "./pages/MoviesList/MoviesList";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import MovieForm from "./pages/MovieForm/MovieForm";
import ProtectedLayout from "./ProtectedLayout/ProtectedLayout";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Rotas protegidas */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <HomePage />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <MoviesList />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies/:id"
            element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <MovieDetails />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies/:id/edit"
            element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <MovieForm />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies/new"
            element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <MovieForm />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
