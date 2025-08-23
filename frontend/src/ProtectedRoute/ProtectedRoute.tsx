
import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/authService";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
