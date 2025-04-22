// import { api, setToken, clearToken } from '../../configAPI/api.js';

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const logOutThunk = createAsyncThunk(
  'auth/logOut',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('/auth/logout', null, {
        withCredentials: true,
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
