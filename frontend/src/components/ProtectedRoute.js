import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // Si l'utilisateur n'est pas authentifié, redirige vers la page de connexion
    return <Navigate to="/" replace />;
  }

  // Si l'utilisateur est authentifié, rend le composant enfant
  return children;
};

export default ProtectedRoute;
