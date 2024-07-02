import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

// Componente para rutas privadas
const PrivateRoute = ({ children }) => {
      let location = useLocation();
      const token = localStorage.getItem('accessToken');
      let isValidToken = false;

      // Verificar si el token es válido
      if (token) {
      try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp > currentTime) {
            isValidToken = true;
            }
      } catch (error) {
            // Si el token no es válido, redirigir al usuario a la página de inicio de sesión
            console.error('Invalid token', error);
      }
      }

      return isValidToken ? (
      children
      ) : (
      <Navigate to="/login" state={{ from: location }} replace />
      );
};

export default PrivateRoute;
