import axios from 'axios';
import { refreshAccessToken } from '../redux/auth/operations';

export const api = axios.create({
  baseURL: 'https://wallet-app-server-zu2t.onrender.com',
  // baseURL: 'http://localhost:3000',
});

export const setToken = token => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
  localStorage.setItem('authToken', token);
};

export const clearToken = () => {
  api.defaults.headers.common.Authorization = '';
  localStorage.removeItem('authToken');
};

export const initializeToken = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    setToken(token);
  }
};

export const requestWithTokenRefresh = async (method, url, data = null) => {
  try {
    const response = await api[method](url, data);
    return response;
  } catch (error) {
    if (error.response?.status === 401) {
      try {
        const refreshResponse = await refreshAccessToken();

        const newToken = refreshResponse?.data?.accessToken;
        if (newToken) {
          setToken(newToken);

          const retryResponse = await api[method](url, data);
          return retryResponse;
        }
      } catch (e) {
        console.error('Refresh failed, logging out...');
        clearToken();
        throw e;
      }
    }

    throw error;
  }
};
