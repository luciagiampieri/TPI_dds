import axios from 'axios';


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


export default refreshToken;