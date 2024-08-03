import axios from 'axios';
import Accesstoken from './AccessToken';
import RefreshToken from './RefreshToken';



const apiClient = axios.create({
  baseURL: 'http://localhost:5173',
  timeout: 10000,
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = RefreshToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axios.post('/api/v1/users/refresh-token');
        const newAccessToken = refreshResponse.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (err) {
        console.error('Refresh token failed', err);
        // Handle logout or redirect to login
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
