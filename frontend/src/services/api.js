import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

// Intercepteur pour ajouter le token d'authentification à chaque requête
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
