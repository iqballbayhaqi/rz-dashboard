import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : 'https://jsonplaceholder.rizalibnu.com'}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
