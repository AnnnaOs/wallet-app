import { createAsyncThunk } from '@reduxjs/toolkit';
import { monoAPI } from '../../configAPI/monoApi.js';

export const fetchCurrencies = createAsyncThunk(
  'currency/fetchCurrencies',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await monoAPI.get('bank/currency');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
