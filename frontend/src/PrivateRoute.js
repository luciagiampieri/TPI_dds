import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const PrivateRoute = ({ children }) => {
      let location = useLocation();
      const token = localStorage.getItem('accessToken');
      let isValidToken = false;

      if (token) {
      try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp > currentTime) {
            isValidToken = true;
            }
      } catch (error) {
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
