import axios from 'axios';
import axiosInstance from './axiosInstance';


const refreshToken = async () => {
      try {
            const token = localStorage.getItem('refreshToken');
            const response = await axios.post('/api/token', { refreshToken: token });
            const { accessToken } = response.data;
            localStorage.setItem('accessToken', accessToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      } catch (error) {
            console.error('Error refreshing token:', error);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
      }
};

const logout = async () => {
      try {
            const refreshToken = localStorage.getItem('refreshToken');
            await axiosInstance.post('/api/logout', { token: refreshToken });
      } catch (error) {
            console.error('Error logging out:', error);
            } finally {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/inicio';
      }
      };

const authService = {
      refreshToken,
      logout,
};

export default authService;