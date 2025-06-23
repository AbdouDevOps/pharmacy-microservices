// src/utils/api.ts
import { toast } from "react-toastify";

export async function customFetch(input: RequestInfo, init: RequestInit = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    ...init.headers,
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };

  const response = await fetch(input, { ...init, headers });

  try {
    const data = await response.json();

    if ( data.status === 401) {
      toast.error("⚠️ Jeton expiré. Redirection vers la connexion...", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });

      setTimeout(() => {
        window.location.href = "/signin";
      }, 3000);
    }

    return data;
  } catch (error) {
    console.error("Erreur de parsing JSON :", error);
    throw error;
  }
}
