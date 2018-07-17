// @flow
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-json-placeholder.herokuapp.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
