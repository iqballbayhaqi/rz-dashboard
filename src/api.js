// @flow
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.rizalibnu.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
