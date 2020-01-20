import axios from 'axios';

const api = axios.create({
  baseURL: 'https://10.1.73.166:3333',
})

export default api;
