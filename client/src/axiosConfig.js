// axiosConfig.js
import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:3000',
});
// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage (or cookies)
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;