import { createSlice } from '@reduxjs/toolkit';
import { registerUserThunk, logoutThunk, loginUserThunk } from './operations';

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
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.isAuthError = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.isAuthError = null;
      })
      .addCase(loginUserThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isAuthError = payload;
      });
  },
});

export const authReducer = authSlice.reducer;
