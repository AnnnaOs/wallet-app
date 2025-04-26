import { createAsyncThunk } from "@reduxjs/toolkit";

export const apiMg = axios.create({
    baseURL: 'https://wallet-app-dusky.vercel.app',
  });
  apiMg.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });  

export const fetchCurrentUserThunk = createAsyncThunk('user/current', async (_, thunkAPI) => {
    try {
        const {data} = await apiMg.get('current');
        
        return data;
    } catch (error) {
        console.log('Ошибка при загрузке данных:', error.response.data);
        return thunkAPI.rejectWithValue(error.message);
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