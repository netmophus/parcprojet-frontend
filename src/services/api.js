import axios from 'axios';

const API = axios.create({
  baseURL: "https://parcprojet-backend-cc80b8e5455c.herokuapp.com//api",
  //baseURL: process.env.REACT_APP_API_URL || 'http://192.168.1.221:5000/api',
});

// ✅ Intercepteur pour attacher le token à chaque requête
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



export default API;