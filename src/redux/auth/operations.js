import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, setToken, clearToken } from '../../configAPI/api.js';

export const registerUserThunk = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post('/auth/register', credentials);
      setToken(data.accessToken);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.data.message || 'Registration failed'
      );
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post('/auth/login', credentials);
      setToken(data.accessToken);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data.message || 'Login failed');
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/auth/logout');
      clearToken();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const refreshThunk = createAsyncThunk(
  '/user/current',
  async (_, thunkAPI) => {
    const savedToken = thunkAPI.getState().auth.token;
    if (!savedToken) {
      return thunkAPI.rejectWithValue('No token found');
    }

    setToken(savedToken);

    try {
      const { data } = await api.get('/user/current');
      return data;
    } catch (error) {
      console.error(error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editCurrentUserThunk = createAsyncThunk(
  'user/current',
  async ({ id, name, email, balance, avatarUrl }, thunkAPI) => {
    try {
      const updateData = {};
      if (name !== undefined) updateData.name = name;
      if (email !== undefined) updateData.email = email;
      if (balance !== undefined) updateData.balance = balance;
      if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl;

      const { data } = await api.patch(`/user/${id}`, updateData);
      return data;
    } catch (error) {
      console.log(error.response?.data);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
