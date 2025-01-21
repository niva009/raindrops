import axios from 'axios';

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Remove token logic
http.interceptors.request.use(
  (config) => {
    // Simply return the config without modifying headers
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
