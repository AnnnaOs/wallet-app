import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories } from './operations.js';

const initialState = {
  categories: null,
  status: 'idle',
  error: null,
  categoriesFetched: false, // Флаг для проверки, были ли категории загружены
};

const modalsSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
        state.categoriesFetched = true; // Обновляем флаг
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default modalsSlice.reducer;
