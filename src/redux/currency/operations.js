import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrencyRates } from '../../configAPI/monoApi.js';

export const fetchCurrencyRates = createAsyncThunk(
  'currency/fetchRates',
  async (_, { rejectWithValue }) => {
    try {
      return await getCurrencyRates();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
