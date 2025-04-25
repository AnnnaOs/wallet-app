import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://wallet-app-server-zu2t.onrender.com',
});

export const setToken = token => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
  localStorage.setItem('authToken', token); //збереження токена в localstorage
};

export const clearToken = () => {
  api.defaults.headers.common.Authorization = '';
  localStorage.removeItem('authToken'); //видалити токен з localstorage
};

// ініціалізація токена при завантаженні додатка
export const initializeToken = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    setToken(token);
  }
};
