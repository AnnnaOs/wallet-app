import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../configAPI/api';

export const fetchCurrentUserThunk = createAsyncThunk(
  'users/current',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get('current');

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editCurrentUserThunk = createAsyncThunk(
  'users/current',
  async ({ id, name, email, balance, avatarUrl }, thunkAPI) => {
    try {
      const updateData = {};
      if (name !== undefined) updateData.name = name;
      if (email !== undefined) updateData.email = email;
      if (balance !== undefined) updateData.balance = balance;
      if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl;
      // Только разрешённые поля

      const { data } = await api.patch(`/users/${id}`, updateData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
