import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, setToken, clearToken } from '../../configAPI/api.js';

// Функція для перевірки токена і оновлення його, якщо потрібно
const tryRefreshTokenAndRetry = async (method, url, data = null) => {
  try {
    // Запит на метод API
    const response = await api[method](url, data);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      try {
        // Якщо токен сплив, оновлюємо його
        const refreshResponse = await api.post('/auth/refresh');
        const newToken = refreshResponse.data.accessToken;

        // Оновлюємо токен
        setToken(newToken);

        // Повторюємо запит з новим токеном
        const retryResponse = await api[method](url, data);
        return retryResponse.data;
      } catch (e) {
        // Якщо не вдалося оновити токен
        console.error('Refresh failed', e);
        clearToken();
        throw e;
      }
    }
    // Якщо помилка інша
    throw error;
  }
};

export const registerUserThunk = createAsyncThunk('auth/register', async (credentials, thunkAPI) => {
  try {
    const { data } = await api.post('/auth/register', credentials);
    setToken(data.accessToken);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data.message || 'Registration failed');
  }
});

export const loginUserThunk = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const { data } = await api.post('/auth/login', credentials);
    setToken(data.accessToken);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data.message || 'Login failed');
  }
});

export const logoutThunk = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await api.post('/auth/logout');
    clearToken();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const refreshThunk = createAsyncThunk('/users/current', async (_, thunkAPI) => {
  const savedToken = localStorage.getItem('authToken');
  if (!savedToken) {
    return thunkAPI.rejectWithValue('No token found');
  }

  setToken(savedToken);

  try {
    const data = await tryRefreshTokenAndRetry('get', '/users/current');
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const editCurrentUserThunk = createAsyncThunk('user/current', async ({ id, name, email, balance, avatarUrl }, thunkAPI) => {
  try {
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (balance !== undefined) updateData.balance = balance;
    if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl;

    const data = await tryRefreshTokenAndRetry('patch', `/user/${id}`, updateData);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshAccessToken = () => async () => {
  try {
    const response = await api.post('/auth/refresh');
    return response.data;
  } catch (error) {
    console.error('Error refreshing token', error);
    throw new Error('Refresh failed');
  }
};
