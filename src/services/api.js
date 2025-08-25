import axios from 'axios';

const API = axios.create({
  //baseURL: "https://fahimtabackend-647bfe306335.herokuapp.com/api",
  baseURL: process.env.REACT_APP_API_URL || 'http://192.168.80.55:5000/api',
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