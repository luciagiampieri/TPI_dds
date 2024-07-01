import axios from 'axios';
import refreshToken from './auth.service';


// Crear una instancia de Axios
const axiosInstance = axios.create();


axiosInstance.interceptors.request.use(
      async config => {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken && config.headers.requiresAuth) {
                  config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
      },
      error => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
      response => response,
      async error => {
            const originalRequest = error.config;
            if (error.response.status === 403 && !originalRequest._retry) {
                  originalRequest._retry = true;
                  await refreshToken();
                  originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
                  return axiosInstance(originalRequest);
            }
            return Promise.reject(error);
      }
);


export default axiosInstance;
