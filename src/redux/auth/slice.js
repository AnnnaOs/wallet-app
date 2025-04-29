import { createSlice } from '@reduxjs/toolkit';
import {
  refreshThunk,
  registerUserThunk,
  logoutThunk,
  loginUserThunk,
} from './operations';

const initialState = {
  user: {
    name: null,
    email: null,
    balance: null,
  },
  token: null,
  isLoggedIn: false,
  isLoading: false,
  isRefreshing: false,
  isAuthError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokenFromStorage: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // Обработка для refreshThunk (получение текущего пользователя)
      .addCase(refreshThunk.pending, state => {
        state.isRefreshing = true;
        state.isLoggedIn = true;
      })
      .addCase(refreshThunk.fulfilled, (state, { payload }) => {
        state.user = payload.data;
        state.token = payload.token;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.isAuthError = null;
      })
      .addCase(refreshThunk.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.isAuthError = payload || 'Ошибка авторизации';
      })

      // Обработка для registerUserThunk (регистрация)
      .addCase(registerUserThunk.pending, state => {
        state.isLoading = true;
        state.isAuthError = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.isAuthError = null;
      })
      .addCase(registerUserThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isAuthError = payload;
      })

      // Обработка для loginUserThunk (вход)
      .addCase(loginUserThunk.pending, state => {
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
      })

      // Обработка для logoutThunk (выход)
      .addCase(logoutThunk.fulfilled, () => {
        return initialState;
      });
  },
});

export const { setTokenFromStorage } = authSlice.actions;
export const authReducer = authSlice.reducer;
