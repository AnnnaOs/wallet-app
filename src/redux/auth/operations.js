import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";




export const goitApi = axios.create({
  baseURL: 'https://wallet-app-dusky.vercel.app/'
});

export const setAuthHeader = token => {
  goitApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const clearAuthHeader = () => {
  goitApi.defaults.headers.common.Authorization = ''
};


export const refreshThunk = createAsyncThunk(`/user/current`, async (_, thunkApi) => {
  const savedToken = thunkApi.getState().auth.token;
  if (!savedToken) {
    return thunkApi.rejectWithValue('No token found');
  }

  setAuthHeader(savedToken);
  try {
    const { data } = await goitApi.get('user/current');
    return data;
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error.response?.data || error.message);
    return thunkApi.rejectWithValue(error.message);
  }
});

export const editCurrentUserThunk = createAsyncThunk(
    'user/current',
    async ({ id, name, email, balance, avatarUrl }, thunkAPI) => {
      try {
        const updateData = {};
if (name !== undefined) updateData.name = name;
if (email !== undefined) updateData.email = email;
if (balance !== undefined) updateData.balance = balance;
if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl;
 // Только разрешённые поля
  
        const { data } = await apiMg.patch(`/user/${id}`, updateData);
        return data;
      } catch (error) {
        console.log('Ошибка обновления данных:', error.response?.data);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
