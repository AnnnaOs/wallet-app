import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../configAPI/api.js';
import { setCategories } from './slice.js';
import { areCategoriesLoaded } from './selectors.js';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const categoriesLoaded = areCategoriesLoaded(getState());

      if (categoriesLoaded) {
        return rejectWithValue('Categories already loaded');
      }

      const { data } = await api.get('/categories');

      dispatch(setCategories(data));

      return data;
    } catch (error) {
      console.error('Failed to load categories:', error);
      return rejectWithValue(error.message);
    }
  }
);
