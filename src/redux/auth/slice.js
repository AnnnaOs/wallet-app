import { createSlice } from '@reduxjs/toolkit';
import { registerUserThunk, logoutThunk } from './operations';

const initialState = {
  user: {
    name: null,
    email: null,
    balance: null,
  },
  token: null,
  isLoggedIn: false,
  isLoading: false,
  IsRefreshing: false,
  isAuthError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(registerUserThunk.pending, state => {
        state.isLoading = true;
        state.isAuthError = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoading = false;
        state.isLoggedIn = true;
        state.isAuthError = null;
      })
      .addCase(registerUserThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isAuthError = payload;
      })
      .addCase(logoutThunk.fulfilled, () => {
        return initialState;
      });
  },
});

export const authReducer = authSlice.reducer;
