import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../configAPI/api';

export const fetchBalance = createAsyncThunk(
  'finance/fetchBalance',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get('/balance');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
