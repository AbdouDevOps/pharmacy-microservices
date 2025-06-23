// src/components/ProtectedRoute.jsx
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Shield, Heart, Clock } from 'lucide-react';
import { toast, ToastContainer, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProtectedRoute = () => {


    const token = localStorage.getItem("token");


  useEffect(() => {
      const token = localStorage.getItem("token");
  
      if (!token) {
        console.error("Aucun token trouvé.");
        return;
      }
  
      fetch("http://localhost:8081", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 401) {
            toast.error("⚠️ Jeton expiré. Redirection...", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              className: "custom-toast",
              transition: Slide,
              icon: <span role="img" aria-label="clock">⏰</span>,
            });
            setTimeout(() => {
              window.location.href = "/signin";
            }, 3000);
          }
        })
        .catch((err) => {
          console.error("Erreur:", err);
        });
    }, []);
  

  return token ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
