// src/api/axiosInterceptor.ts
import axios from "axios";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:8081/api/pharmacists/me",
});

// Ajouter le token dans toutes les requêtes si présent
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Gérer les erreurs globalement
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data?.message?.includes("JWT a expiré")
    ) {
      alert("Votre session a expiré. Veuillez vous reconnecter.");
      localStorage.removeItem("token");
      window.location.href = "/signin"; // redirection immédiate
    }
    return Promise.reject(error);
  }
);

export default api;
