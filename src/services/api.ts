import axios from 'axios';
import store from '../store/store';

const URL = process.env.REACT_APP_API_URL;
const PORT = process.env.REACT_APP_API_PORT;

const api = axios.create({
  baseURL: `${URL}:${PORT}`,
});

// api.interceptors.request.use(
//   (config) => {
//     const token = store.getState().auth.token;
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

export default api;
