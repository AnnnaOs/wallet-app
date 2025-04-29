import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStatistics = createAsyncThunk(
  'statistics/fetch',
  async ({ month, year }, thunkAPI) => {
    try {
      const response = await axios.get(
        `/statistics?month=${month}&year=${year}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
