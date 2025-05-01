import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expenses: [],
  income: [],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCategories } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;
