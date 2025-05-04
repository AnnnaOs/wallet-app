import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, clearToken, setToken } from '../../configAPI/api.js';
import { setCategories } from './slice.js';
import { areCategoriesLoaded } from './selectors.js';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (_, { getState, dispatch, rejectWithValue }) => {
  try {
    const categoriesLoaded = areCategoriesLoaded(getState());

    if (categoriesLoaded) {
      return rejectWithValue('Categories already loaded');
    }

    const { data } = await api.get('/categories');

    dispatch(setCategories(data));

    return data;
  } catch (error) {
    if (error.response?.status === 401) {
      try {
        const refreshRes = await api.post('/auth/refresh');
        const newToken = refreshRes.data.accessToken;
        setToken(newToken);

        // Повторний запит після оновлення токена
        const { data } = await api.get('/categories');
        dispatch(setCategories(data));
        return data;
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        clearToken();
        return rejectWithValue('Session expired. Please log in again.');
      }
    }

    console.error('Failed to load categories:', error);
    return rejectWithValue(error.message);
  }
});
