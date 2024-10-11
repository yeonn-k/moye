import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;
const PORT = process.env.REACT_APP_API_PORT;

const api = axios.create({
  baseURL: `${URL}:${PORT}`,
});

export default api;
