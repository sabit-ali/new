// axiosInstance.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:6000', // Replace with your API base URL
  timeout: 5000, // Timeout for API requests
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data; // Return response data if request succeeds
  },
  (error) => {
    // Handle error responses
    if (error.response) {
      const { status, data } = error.response;
      return Promise.reject({ status, message: data.message });
    }
    return Promise.reject({ status: 500, message: 'Internal Server Error' });
  }
);

export default axiosInstance;
