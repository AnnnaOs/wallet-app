import { createSlice } from '@reduxjs/toolkit';
import { fetchCurrencyRates } from './operations.js';

const initialState = {
  usdRate: { rateBuy: 0, rateSell: 0 },
  euroRate: { rateBuy: 0, rateSell: 0 },
  loading: false,
  error: null,
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCurrencyRates.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrencyRates.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.usdRate) state.usdRate = action.payload.usdRate;
        if (action.payload.euroRate) state.euroRate = action.payload.euroRate;
      })
      .addCase(fetchCurrencyRates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default currencySlice.reducer;
