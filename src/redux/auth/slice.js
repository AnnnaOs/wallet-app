import { createSlice } from '@reduxjs/toolkit';
import { logOutThunk } from './operations';

const initialState = {
  user: { name: '', email: '' },
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(logOutThunk.fulfilled, state => {
      state.user = { name: '', email: '' };
      state.token = null;
      state.isLoggedIn = false;
    });
  },
});

export const authReducer = authSlice.reducer;
