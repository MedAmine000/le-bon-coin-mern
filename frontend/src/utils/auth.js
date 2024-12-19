// Vérifie si un utilisateur est authentifié (en fonction de la présence du token)
export const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token; // Renvoie true si le token existe, sinon false
  };
  
  // Stocke le token dans localStorage
  export const login = (token) => {
    localStorage.setItem("token", token);
  };
  
  // Déconnecte l'utilisateur en supprimant le token
  export const logout = () => {
    localStorage.removeItem("token");
  };
  